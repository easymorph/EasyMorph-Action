define(function(require) {

    var WidgetStateChanges = require('./WidgetStateChanges');
	var WidgetProperties = require('./WidgetProperties');
	var Widget = require('./Widget');

	function Extension() {
		this._widgets = {};
		this._widget_states = {};
	};

	Extension.prototype = {

		_widgets: null,
		_widget_states: null,

		onPaint: function($element, layout)
		{

			try
			{
				var id = layout.qInfo.qId;
                var new_state = this._createWidgetState($element, layout);
				var old_state = this._widget_states[id] || null;

				if (!this._widgets[id])
				{
					this._widgets[id] = new Widget(id);
				}

                var changes = new WidgetStateChanges(new_state, old_state);

                if (changes.isStateChanged())
                {
                    this._widget_states[id] = new_state;
                }

                console.log("Callback", id, changes.isStateChanged(), changes, new_state, old_state);

				this._widgets[id].onPaint($element, new_state, old_state, changes);

			} catch (e) {
				console.log(e);
				throw e;
			}
		},

        _createWidgetState: function($element, layout)
        {
            return {
                properties: new WidgetProperties(layout),
                sizes: {
                    heigth: $element.outerHeight(),
                    width: $element.outerWidth()
                }
            };
        }
	};

	return Extension;

});
