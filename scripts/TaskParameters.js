// Used by WidgetProperties
define(["jquery"], function()
{
	function TaskParameters(layout)
	{
		if (!(layout.task_parameters instanceof Array)) {
			throw new TypeError('\'task_parameters\' property should be an array');
		}

		for (var i = 0, l = layout.task_parameters.length; i < l; i++)
		{
			if (typeof layout.task_parameters[i].name !== 'string') {
				throw new TypeError('\'task_parameters\' element at index ' + i + ' should have a \'name\' property of string type');
			}

			if (typeof layout.task_parameters[i].value !== 'string') {
				throw new TypeError('\'task_parameters\' element at index ' + i + ' should have a \'value\' property of string type');
			}
		}

		this._params = layout.task_parameters.slice(0);

		this._errors = this._validate();
	};

	TaskParameters.prototype = {

		_params: null,

		_errors: null,

		getAll: function()
		{
			return this._params;
		},

		errors: function()
		{
			return this._errors;
		},

		_eachParam: function(func)
		{
			for (var i = 0, l = this._params.length; i < l; i++)
			{
				func(this._params[i].name, this._params[i].value, i);
			}
		},

		_validate: function()
		{
			var errors = [];

			this._eachParam(function(name, value, index)
			{
				if (name === '')
				{
					errors.push('Please specify <strong>Parameter name</strong> property ' +
						'for element #' + (index + 1) + ' in <strong>Task parameters</strong>');
				}
			});

			var params = {};

			this._eachParam(function(name, value, index)
			{
				if (name === '')
				{
					return;
				}

				if ((params.hasOwnProperty(name)) && (params[name] === false))
				{
					errors.push('<strong>Task parameters</strong> contains ' +
						'several parameters with the same <strong>Parameter name</strong> "' + name + '"');

					params[name] = true;
				}
				else
				{
					params[name] = false;
				}
			});

			return errors;
		},

		isValid: function()
		{
			return (this._errors.length === 0);
		},

		isEqual: function(other_parameters)
		{
			if (!(other_parameters instanceof TaskParameters)) {
				throw new TypeError('\'other_parameters\' argument should be ' +
					'an instance of TaskParameters');
			}

			var other_params = other_parameters.getAll();

			if (this._params.length != other_params.length)
			{
				return false;
			}

			for (var i = 0, l = this._params.length; i < l; i++)
			{
				if (this._params[i].name !== other_params[i].name)
				{
					return false;
				}

				if (this._params[i].value !== other_params[i].value)
				{
					return false;
				}
			}

			return true;
		}
	};

	return TaskParameters;
});