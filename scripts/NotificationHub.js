define(function(require) {

	var $ = require("jquery");
    var logger = require("./logger");
	var signalR = require("signalR");

	function NotificationHub(host, session_key)
	{
        if (host == null)
        {
            throw new Error("\'host\' argument is empty");
        }

		this._connection = $.hubConnection(host + "/signalr");
        // connection.logging doesn't seems to be working.
        // In both extension and EM Server Web console.
        this._connection.logging = logger.isLogging();
        this._connection.error(logger.log);
        // Turning logger on and off after this point will not affect
        // SignalR internal logging and error handler.

		this._hub_proxy = this._connection.createHubProxy('notificationsHub');
		this._session_key = session_key;

    	this._hub_proxy.on('jobLogChanged', function(task_id, new_records) {
			logger.log("jobLogChanged", task_id, new_records);
		});

		this._hub_proxy.on('jobStatusChanged', function(task_id, status) {
			logger.log("jobStatusChanged", task_id, status);
		});

		this._hub_proxy.on('jobStatusTextChanged', function(task_id, status) {
			logger.log("jobStatusTextChanged", task_id, status);
		});
	};

	NotificationHub.prototype =
	{
		_connection: null,
		_hub_proxy: null,

		start: function(space, task_id, last_event_id, log_timestamp)
		{
			var hub_proxy = this._hub_proxy;

			var hub_start_promise = this._connection.start();

            window.foo = hub_start_promise;

			var session_key = this._session_key;

			return new Promise(function(resolve, reject)
			{
				hub_start_promise
				.done(function()
				{
                    var auth_promise = (session_key !== null)
                        ? (hub_proxy.invoke('Authorize', session_key))
						: ($.Deferred().resolve().promise());

                    return auth_promise.done(function()
					{
						var task_log_promise = hub_proxy.invoke('SubscribeSpaceJobLogEvents', space, task_id, last_event_id, log_timestamp, null);
						var space_events_promise = hub_proxy.invoke('SubscribeSpaceAllJobsEvents', space);

						space_events_promise.done(function () {
							logger.log("SubscribeSpaceAllJobsEvents", arguments);
						});

						task_log_promise.done(function (items) {
							logger.log("SubscribeSpaceJobLogEvents log items", items);
						});

						$.when(space_events_promise, task_log_promise)
						.done(function(_, log_items) { resolve(log_items); })
						.fail(reject);
					})
					.fail(reject);
               });
            });
		},

		stop: function()
		{
			this._connection.stop();
		},

		onTaskStatusChanged: function(handler)
		{
			this._hub_proxy.on('jobStatusChanged', handler);
		},

		onTaskTextStatusChanged: function(handler)
		{
			this._hub_proxy.on('jobStatusTextChanged', handler);
		},

		onTaskLogChanged: function(handler)
		{
			this._hub_proxy.on('jobLogChanged', handler);
		}
	};

	return NotificationHub;
});
