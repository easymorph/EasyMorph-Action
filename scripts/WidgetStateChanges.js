define(function()
{
	function WidgetStateChanges(new_state, old_state)
	{
		if (new_state == null) {
			throw new TypeError('\'new_state\' argument is not specified');
		}

        this._new_state = new_state;
        this._old_state = old_state || null;

        this._new_properties = new_state.properties;
        this._old_properties = (this._old_state !== null) ? (this._old_state.properties) : (null);
    };

	WidgetStateChanges.prototype = {

        _new_state: null,
        _old_state: null,

        _new_properties: null,
        _old_properties: null,

        isStateChanged: function()
        {
            return (this.isPropertiesChanged() || this.isWidgetSizesChanged());
        },

		isPropertiesChanged: function()
		{
			return !this._new_properties.isEqual(this._old_properties);
		},

		isConnectionPropertiesChanged: function() {
			return this._new_properties.isCredentialsChanged(this._old_properties);
		},

		isTaskIdChanged: function()
		{
            return (
                (this._old_properties === null)
                ||
                (this._new_properties.taskId() !== this._old_properties.taskId())
            );
        },

        isConnectionPropertiesOrTaskIdChanged: function()
        {
            return (this.isConnectionPropertiesChanged() || this.isTaskIdChanged());
        },

        isTaskParametersChanged: function()
        {
            return this._new_properties.taskParameters().isEqual(this._old_properties.taskParameters());
        },

        isReloadParametersChanged: function()
        {
            return (
                (this._old_properties === null)
                ||
                (this._new_properties.isReloadApp() !== this._old_properties.isReloadApp())
                ||
                (this._new_properties.isPartialReload() !== this._old_properties.isPartialReload())
            );
        },

        isWidgetSizesChanged: function()
        {
            if (this._old_state === null)
            {
                return true;
            }

            var new_sizes = this._new_state.sizes;
            var old_sizes = this._old_state.sizes;

			return (
				(new_sizes.width !== old_sizes.width)
				||
				(new_sizes.height !== old_sizes.height)
			);
        }
	};

	return WidgetStateChanges;

});
