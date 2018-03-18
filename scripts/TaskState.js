define(function(require)
{
    var qlik = require("qlik");

	function TaskState(task_api, widget_properties)
    {
        if (task_api == null)
        {
            throw new Error("\'task_api\' argument was not specified");
        }

        if (widget_properties == null)
        {
            throw new Error("\'widget_properties\' argument was not specified");
        }

        this._task_api = task_api;
        this.changeProperties(widget_properties);

        this._is_connected = false;
        this._status = "idle";
		this._log_items = [];

		this._addEventHandlers();
    };

	TaskState.prototype = {

        _task_api: null,
        _widget_properties: null,

        _is_connected: null,
        _name: null,
        _label: null,

		_status: null,

        _text_status: null,
        _errors_number: null,
        _start_time: null,
        _running_time: null,
		_log_items: null,

        // Getters

        name: function()
        {
            return this._name;
        },

        // Possbile Server Task statused:
        // - Idle,
        // - Scheduled,
        // - Running,
        // - Stopping,
        // - Disabled,
        // - Failed
        status: function()
        {
            return this._status;
        },

        textStatus: function()
        {
            return this._text_status;
        },

        labelOrName: function()
        {
            return this._widget_properties.label() || this._name;
        },

        errorsNumber: function()
        {
            return this._errors_number;
        },

        errorsNumberAsText: function()
        {
            if (this._errors_number === 1)
            {
                return "1 error";
            }
            else
            {
                return this._errors_number + " errors";
            }
        },

		runningTime: function()
		{
			return this._running_time;
		},

        startTime: function()
        {
            return this._start_time;
        },

        logItems: function()
        {
            return this._log_items;
        },

        createActionUrl: function(action)
        {
            return this._task_api.getTaskActionUrl(action);
        },

        elapsedTime: function()
        {
            if (this._start_time === 0)
                return 0;

            return Date.now() - this._start_time;
        },

        elapsedTimeAsString: function()
        {
            var elapsedTime = this.elapsedTime();

            // Source of the code:
            // https://docs.microsoft.com/en-us/scripting/javascript/calculating-dates-and-times-javascript

            var msecPerMinute = 1000 * 60;
            var msecPerHour = msecPerMinute * 60;
            var msecPerDay = msecPerHour * 24;

            var hours = Math.floor(elapsedTime / msecPerHour );
            elapsedTime = elapsedTime - (hours * msecPerHour );

            var minutes = Math.floor(elapsedTime / msecPerMinute );
            elapsedTime = elapsedTime - (minutes * msecPerMinute );

            var seconds = Math.floor(elapsedTime / 1000 );

            var res = "";

            function pad(number)
            {
                var res = number.toString();

                if (res.length < 2)
                    res = '0' + res;

                return res;
            }

            return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        },

        // Actions

        _addEventHandlers: function()
        {
            this._task_api.onTaskStatusChanged(function(new_status)
            {
				this._reset();

				if (new_status === "running")
				{
					this._start_time = Date.now();
				}

                // When Task was successfuly complited ...
				if ((this._status === "running") && (new_status === "idle"))
				{
                    console.log("reload app");
                    this.reloadApp();
				}

                var errors_promise = (new_status === "failed")
                    ? (this._task_api.getTaskInfo().then(function(task_info) { return task_info.errors; }))
                    : (Promise.resolve([]));

                errors_promise.then(function(errors)
                {
                    this._status = new_status;
                    this._errors_number = errors.length;
                    $(this).trigger("status_changed", new_status);
                }.bind(this));
            }
            .bind(this));

            this._task_api.onTaskTextStatusChanged(function(status)
            {
                this._text_status = status;
                $(this).trigger("text_status_changed", status);
            }
            .bind(this));

            this._task_api.onTaskLogChanged(function(new_log_items)
            {
                this._log_items = this._log_items.concat(new_log_items);
                $(this).trigger("log_changed", [new_log_items]);
            }
            .bind(this));
        },

        connect: function()
        {
            if (this._is_connected !== false)
            {
                throw new Error("Widget is already connected to server");
            }

            return this._task_api.connect().then(function(data)
            {
                var task_info = data[0];
                var task_log = data[1];

                this._name = task_info.name;
                this._status = task_info.status;
                this._text_status = task_info.statusAsText;
                this._errors_number = task_info.errors.length;
                this._running_time = task_info.executionDurationInSeconds;
                this._log_items = task_log;

                this._start_time = new Date(Date.now() - (this._running_time * 1000));

                this._is_connected = true;


                $(this).trigger("connected", this);
            }
            .bind(this));
        },

        _ensureConnection: function()
        {
            if (this._is_connected !== true)
            {
                throw new Error("Widget is not connected to server");
            }
        },

		start: function()
		{
            if ((this._status === "idle") || (this._status === "scheduled") || (this._status === "failed"))
            {
                this._ensureConnection();
                var params = this._widget_properties.taskParameters().getAll();
                return this._task_api.start(params);
            }
            else
            {
                return Promise.resolve();
            }
		},

		stop: function()
		{
            if (this._status == "running")
            {
                this._ensureConnection();
                return this._task_api.stop();
            }
            else
            {
                return Promise.resolve();
            }
		},

        _reset: function()
        {
            this._text_status = "";
            this._errors_number = 0;
            this._start_time = 0;
            this._running_time = 0;
            this._log_items = [];
        },

        changeProperties: function(widget_properties)
        {
            if (widget_properties == null)
            {
                throw new Error("\'widget_properties\' argument was not specified");
            }

            this._widget_properties = widget_properties;

            $(this).trigger("properties_changed");
        },

        reloadApp: function()
        {
            var props = this._widget_properties;

            if (props.isReloadApp())
            {
                var app = qlik.currApp();

                // var is_published = (app.model.layout.published === true);
                // The same layout object can be accessed through:
                // app.getAppLayout(function(layout) { console.log(layout.published); });

                app
                .doReload(0, props.isPartialReload())
                .then(function(r)
                {
                    if (r)
                    {
                        app.doSave();
                    }
                });
            }
        },

        onConnected: function(handler)
        {
            $(this).on("connected", handler);
        },

		onStatusChanged: function(handler)
		{
            $(this).on("status_changed", function($event, new_status) { handler(new_status); });
		},

        onTextStatusChanged: function(handler)
        {
            $(this).on("text_status_changed", function($event, new_status) { handler(new_status); });
        },

		onPropertiesChanged: function(handler)
		{
            $(this).on("properties_changed", function($event) { handler(); });
		},

        onLogChanged: function(handler)
        {
            $(this).on("log_changed", function($event, new_log_items) { handler(new_log_items); });
        }
	};

	return TaskState;
});
