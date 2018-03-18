define(function(require)
{
	function TaskControl(task_state)
    {
		this._task_state = task_state;

        this._task_state.onStatusChanged(this.onStatusChanged.bind(this));
        this._task_state.onTextStatusChanged(this.onTextStatusChanged.bind(this));
        this._task_state.onPropertiesChanged(this.onPropertiesChanged.bind(this));
        // this._task_state.onLogChanged(this.onLogChanged.bind(this));
	};

	TaskControl.prototype = {

        _task_state: null,

        _$element: null,
        _$image: null,
        _$heading: null,
        _$details: null,
        _$log: null,

        _timer_interval_id: null,

        // Getters

        $element: function()
        {
            return this._$element;
        },

        // Event handlers

        onTaskStart: function()
        {
            this.resetTimer();
            this.showStopImage();
            this.showHeading(this._task_state.textStatus() || "Running");
            this.startTimer();
            // this.populateAndShowLog();
        },

        onTaskIdle: function()
        {
            this.resetTimer();
            this.showStartImage();
            this.showHeading(this._task_state.labelOrName());
            this.showTaskDocumentationLink();
            // this.resetAndHideLog();
        },

        onTaskFail: function()
        {
            this.resetTimer();
            this.showStartImage();
            this.showHeading(this._task_state.name());
            this.showFailedTaskDetails(this._task_state.errorsNumberAsText());
            // this.resetAndHideLog();
        },

        onTaskDisabled: function()
        {
            this.resetTimer();
            this.showDisabledImage();
            this.showHeading(this._task_state.labelOrName());
            this.showTaskDocumentationLink();
            // this.resetAndHideLog();
        },

        updateControl: function(new_status)
        {
            if ((new_status === "idle") || (new_status === "scheduled"))
            {
                this.onTaskIdle();
            }
            else if (new_status === "running")
            {
                this.onTaskStart();
            }
            else if (new_status === "failed")
            {
                this.onTaskFail();
            }
            else if (new_status === "disabled")
            {
                this.onTaskDisabled();
            }
        },

        onStatusChanged: function(new_status)
        {
            this.updateControl(new_status);
        },

        onTextStatusChanged: function(new_text_status)
        {
            if (this._task_state.status() === "running")
            {
                this.showHeading(new_text_status);
            }
        },

        onPropertiesChanged: function()
        {
            this.updateControl(this._task_state.status());
        },

        onLogChanged: function(new_log_items)
        {
            this.addLogItems(new_log_items);
        },

        onImageClick: function()
        {
            var status = this._task_state.status();

            if ((status === "idle") || (status === "scheduled"))
            {
                this._task_state.start();
            }
            else if (status === "running")
            {
                this._task_state.stop();
            }
            else if (status === "failed")
            {
                this._task_state.start();
            }
            else if (status === "disabled")
            {
                window.alert("Task is disabled");
            }
            else if (status === "stopping")
            {
                window.alert("Task is stopping");
            }
        },

        // Render

		appendTo: function($container)
		{
			var show_details = $container.outerWidth() > 65;

			$container.append(this._render(show_details));
		},

        _render: function(show_details)
        {
            this._$element = $('<div class="em-widget" />');
            this._$image = $('<img class="em-image" />').click(this.onImageClick.bind(this));
            var $taskinfo = $('<div class="em-taskinfo" />');
            this._$heading = $('<div class="em-heading lui-text-default" />');
            this._$details = $('<div class="em-details lui-text-default" />');
            // this._$log = $('<div/>');

            this._$element.append(this._$image);
			if (show_details)
			{
                $taskinfo.append(this._$heading);
                $taskinfo.append(this._$details);
				// this._$element.append(this._$log);
                this._$element.append($taskinfo);
			}

            this.onStatusChanged(this._task_state.status());

            return this._$element;
        },

        // Actions

        _showImage: function(file_name, title)
        {
            this._$image.attr({
                "src": "../extensions/EasyMorph-Action/images/" + file_name,
                "title": title
            });
        },

        showStartImage: function()
        {
            this._showImage("Run.png", "Run task");
        },

        showStopImage: function()
        {
            this._showImage("Stop.png", "Stop task");
        },

        showStoppingImage: function()
        {
            this._showImage("Stopping.png", "Task is stopping");
        },

        showDisabledImage: function()
        {
            this._showImage("Disabled.png", "Task is disabled");
        },

        showHeading: function(text)
        {
            this._$heading.html(text);
        },

        showDetails: function(text)
        {
            this._$details.html(text);
        },

        showTaskDocumentationLink: function()
        {
            var link = $('<a/>')
                        .attr("target", "blank")
                        .attr("href", this._task_state.createActionUrl("doc"))
                        .text("what does it do?");

            this.showDetails(link);
        },

        showFailedTaskDetails: function(errors_text)
        {
            var failed_text = $(document.createTextNode("Last run failed." + "\u00A0"));

            var log_link = $('<a/>')
                            .attr("target", "blank")
                            .attr("href", this._task_state.createActionUrl("log"))
                            .text(errors_text);

            var details = failed_text.add(log_link);

            this.showDetails(details);
        },

        // Timer methods

        startTimer: function()
        {
            this.updateTimer();
            this._timer_interval_id = setInterval(this.updateTimer.bind(this), 1000);
        },

        updateTimer: function()
        {
            this.showDetails("Elapsed " + this._task_state.elapsedTimeAsString());
        },

        resetTimer: function()
        {
            if (this._timer_interval_id)
            {
                clearTimeout(this._timer_interval_id);
                this._timer_interval_id = null;
            }
            this.showDetails("");
        },

        // Log methods

        showLog: function()
        {
            this._$log.show();
        },

        hideLog: function()
        {
            this._$log.hide();
        },

        populateAndShowLog: function()
        {
            this.addLogItems(this._task_state.logItems());
            this._$log.show();
        },

        resetAndHideLog: function()
        {
            this._$log.hide();
            this._$log.html("");
        },

        addLogItems: function(log_items)
        {
            var $elements = log_items.map(function(log_item) {
                return ($("<div/>").html(log_item));
            });
            this._$log.append($elements);
        }
	};

	return TaskControl;
});
