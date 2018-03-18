define(function(require)
{
	var CancellablePromise = require('./CancellablePromise');
	var ServerApiSession = require('./ServerApiSession');
	var TaskApi = require('./TaskApi');
	var TaskState = require('./TaskState');

	var TaskConnection = {

		createCancelledConnection: function()
		{
			return CancellablePromise.cancel();
		},

		connectWithDifferentCredentials: function(widget_properties_provider)
		{
            var widget_properties = widget_properties_provider();

			return new CancellablePromise(function(resolve, reject)
			{
				ServerApiSession.Start(
					widget_properties.host(),
					widget_properties.space(),
					widget_properties.password()
				)
				.then(function(api_session)
				{
					TaskConnection
						.connectWithDifferentTaskSettings(api_session, widget_properties_provider)
						.then(resolve, reject);
            	})
            	.catch(reject);
			});
		},

		connectWithDifferentTaskSettings: function(api_session, widget_properties_provider)
		{
            var widget_properties = widget_properties_provider();

            var task_api = new TaskApi(api_session, widget_properties.taskId());
            var task_state = new TaskState(task_api, widget_properties_provider);

			return new CancellablePromise(function(resolve, reject)
			{
				task_state.connect()
					.then(function()
					{
            			resolve([api_session, task_state]);
	            	})
            		.catch(function(errors)
            		{
						reject(errors);
					});
			});
		}
	};

	return TaskConnection;
});
