define(function(require)
{
    var logger = require('./logger');
    var utils = require('utils');

	function TaskApi(api_session, task_id)
    {
        if (api_session == null)
        {
            throw new Error("\'api_session\' argument is empty");
        }

        if (task_id == null)
        {
            throw new Error("\'task_id\' argument is empty");
        }

        this._api_session = api_session;
		this._space_name = api_session.space();
		this._task_id = task_id;
        this._ems_client = api_session.client();
		this._notification_hub = api_session.notificationHub();
	};

	TaskApi.prototype = {

        _api_session: null,
		_space_name: null,
		_task_id: null,
        _ems_client: null,
		_notification_hub: null,

		start: function(task_parameters)
		{
            // params is an Array of {name, value} objects
            var params = (task_parameters != null)
                ? (task_parameters.map(function(p) { return {name: p.name, value: p.value};}))
                : ([]);
                
            return this._ems_client.startTaskWithParameters(this._space_name, this._task_id, {taskParameters: params});
		},

		stop: function()
		{
			return this._ems_client.stopTask(this._space_name, this._task_id);
		},

        getTaskActionUrl: function(action)
        {
            var host = this._api_session.host();

            var url = utils.HttpClient.joinUrl("space", this._space_name, "tasks", action, this._task_id);

            if (host[host.length - 1] != '/')
                host = host + '/';

            return host + url;
        },

		getTaskInfo: function()
		{
			return this._ems_client.getTaskById(this._space_name, this._task_id);
		},

		getTaskLog: function()
		{
			return this._ems_client.getTaskLog(this._space_name, this._task_id, "errors, logfilecontent, lasteventid");
		},

        _startNotification: function()
        {
            var hubStartPromise = this.getTaskLog().then(function(log)
            {
                var task_log = log.logFileContent;

				logger.log("getTaskLog() log items", task_log);

				return this._notification_hub.start(this._space_name, this._task_id, log.lastEventId, log.timeStamp)
					.then(function(log_items)
					{
						return task_log.concat(log_items);
					});
            }
            .bind(this));

            return hubStartPromise;
        },

        connect: function()
        {
            return this.getTaskInfo().then(function(task_info)
            {
				return this._startNotification()
				.then(function(task_log)
				{
					return [task_info, task_log];
				});
            }
            .bind(this));
        },

		onTaskStatusChanged: function(handler)
		{
			this._notification_hub.onTaskStatusChanged(function(task_id, status)
			{
				handler(status);
			});
		},

        onTaskTextStatusChanged: function(handler)
        {
            this._notification_hub.onTaskTextStatusChanged(function(task_id, status)
            {
                if (task_id === this._task_id)
                {
                    handler(status);
                }
            }.bind(this));
        },

        onTaskLogChanged: function(handler)
        {
            this._notification_hub.onTaskLogChanged(function(task_id, new_records)
            {
                handler(new_records);
            });
        }
	};

	return TaskApi;
});
