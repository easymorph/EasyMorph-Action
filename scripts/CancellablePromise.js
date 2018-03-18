define([], function()
{
	function CancellablePromise(resolver)
	{
		var is_pending = true;
		var is_cancelled = false;

		var promise = new Promise(function(resolve, reject)
		{
			resolver(
				function()
				{
					if (!is_cancelled)
					{
						is_pending = false;
						resolve.apply(undefined, arguments);
					}
				},
				function()
				{
					if (!is_cancelled)
					{
						is_pending = false;
						reject.apply(undefined, arguments);
					}
				}
			);
		});

		this.isPending = function()
		{
			return is_pending && !is_cancelled;
		};

		this.isCancelled = function()
		{
			return is_cancelled;
		};

		this.then = function(resolve, reject)
		{
			var temp_promise = promise.then(resolve, reject);

			var new_promise = new CancellablePromise(function(rs, rj)
			{
				temp_promise.then(rs, rj);
			});

			var parentCancelAll = this.cancelAll.bind(this);

			new_promise.cancelAll = function()
			{
				this.cancel();
				parentCancelAll();
			}

			return new_promise;
		};

		this.catch = function(handler)
		{
			return this.then(undefined, handler)
		};

		this.cancel = function()
		{
			is_cancelled = true;
		};

		this.cancelAll = function()
		{
			this.cancel();
		};
	};

	CancellablePromise.resolve = function()
	{
        var args = arguments;

		return new CancellablePromise(function(resolve, reject)
		{
			resolve.apply(undefined, args);
		});
	};

	CancellablePromise.reject = function()
	{
        var args = arguments;

		return new CancellablePromise(function(resolve, reject)
		{
			reject.apply(undefined, args);
		});
	};

	CancellablePromise.cancel = function()
	{
		var promise = new CancellablePromise(function() {});
		promise.cancel();
		return promise;
	};

	return CancellablePromise;
});