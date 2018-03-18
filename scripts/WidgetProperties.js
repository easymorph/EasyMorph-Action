define(["jquery", "./TaskParameters"], function($, TaskParameters)
{
	function WidgetProperties(layout)
	{
		if (typeof layout.host !== 'string') {
			throw new TypeError('\'host\' property should be a string');
		}

		if (typeof layout.space !== 'string') {
			throw new TypeError('\'space\' property should be a string');
		}

		if (typeof layout.password !== 'string') {
			throw new TypeError('\'password\' property should be a string');
		}

		if (typeof layout.task_id !== 'string') {
			throw new TypeError('\'task_id\' property should be a string');
		}

		if (typeof layout.label !== 'string') {
			throw new TypeError('\'label\' property should be a string');
		}

		if (typeof layout.reload_app !== 'boolean') {
			throw new TypeError('\'reload_app\' property should be a boolean');
		}

		if (typeof layout.partial_reload !== 'boolean') {
			throw new TypeError('\'partial_reload\' property should be a boolean');
		}

		var task_params = new TaskParameters(layout);

		this._host = layout.host;
		this._space = layout.space.toLowerCase() || "default";
		this._password = layout.password;
		this._task_id = layout.task_id;
        this._label = layout.label;
		this._task_parameters = task_params;

        this._reload_app = layout.reload_app;
        this._partial_reload = (this._reload_app === true) ? (layout.partial_reload) : (false);

		this._errors = this._validate();
	};

	WidgetProperties.prototype = {

		_host: null,

		_space: null,

		_password: null,

		_task_id: null,

		_label: null,

        _reload_app: null,

        _partial_reload: null,

		_task_parameters: null,

		_errors: null,

		host: function()
		{
			return this._host;
		},

		space: function()
		{
			return this._space;
		},

		password: function()
		{
			return this._password;
		},

		taskId: function()
		{
			return this._task_id;
		},

		label: function()
		{
			return this._label;
		},

		taskParameters: function()
		{
			return this._task_parameters;
		},

        isReloadApp: function()
        {
            return this._reload_app;
        },

        isPartialReload: function()
        {
            return this._partial_reload;
        },

		errors: function()
		{
			return this._errors;
		},

		_validate: function()
		{
			var errors = [];

			if (this._host === '')
			{
				errors.push('Please specify <strong>Connection</strong> > ' +
					'<strong>Host and port</strong> property');
			}

			if (this._space === '')
			{
				errors.push('Please specify <strong>Connection</strong> > ' +
					'<strong>Space</strong> property');
			}

			if (this._task_id === '')
			{
				errors.push('Please specify <strong>Connection</strong> > ' +
					'<strong>Task ID</strong> property');
			}

			errors = errors.concat(this._task_parameters.errors());

			return errors;
		},

		isValid: function()
		{
			return (this._errors.length === 0);
		},

		isEqual: function(other_properties)
		{
            if (other_properties === null)
            {
                return false;
            }

			return (
				(this.host() === other_properties.host())
				&&
				(this.space() === other_properties.space())
				&&
				(this.password() === other_properties.password())
				&&
				(this.taskId() === other_properties.taskId())
				&&
				(this.label() === other_properties.label())
				&&
				(this.taskParameters().isEqual(other_properties.taskParameters()))
				&&
				(this.isReloadApp() === other_properties.isReloadApp())
				&&
				(this.isPartialReload() === other_properties.isPartialReload())
			);
		},

		isCredentialsChanged: function(other_properties) {
			return (
				(other_properties === null)
				||
				(
					this.host() !== other_properties.host()
					||
					this.password() !== other_properties.password()
					||
					this.space() !== other_properties.space()
				)
			);
		},

		isTaskIdOrParametersChanged: function(other_properties)
		{
			return (
				(other_properties === null)
				||
				(this.taskId() !== other_properties.taskId())
				||
				(!this.taskParameters().isEqual(other_properties.taskParameters()))
			);
		}

	};

	return WidgetProperties;

});
