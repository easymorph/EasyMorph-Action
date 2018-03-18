define(function(require) {

	var $ = require('jquery');
	var WidgetProperties = require('./WidgetProperties');

	var model = require('model');
	var utils = require('utils');

	function WidgetContent(widget_properties, $container) {

		if (!(widget_properties instanceof WidgetProperties)) {
			throw new TypeError('\'widget_properties\' argument ' +
				'should be an instance of WidgetProperties');
		}

		this._widget_properties = widget_properties;
		this._$container = $container;

		this.onFirstRender();
	};

	WidgetContent.prototype = {

		_widget_properties: null,

		_$container: null,

		_server_api_session: null,

		onFirstRender: function() {
			ServerApiSession.Start(_widget_properties.host(), _widget_properties.space(), _widget_properties.password())
				.then((function(session) {
					this._server_api_session = session;
					this.renderTasksList();
				}).bind(this))
				.catch((function(error) {
					this.showErrors([error])
				}).bind(this));
		},

		render: function() {

			if (!(widget_properties instanceof WidgetProperties)) {
				throw new TypeError('\'widget_properties\' argument ' +
					'should be an instance of WidgetProperties');
			}

			this._storeElement($element);

			if (this._isPropertiesChanged(widget_properties)) {
				// Add something to $element in order not to mistakenly
				// repaint widget while properties are being processed
				$element.html(
					'<div class="em-server-loading">Loading ...</div>'
				);
				this._onPropertiesChange(widget_properties);
			// After sheet change ...
			} else if ($element.html() === '') {
				this._onEmptyElement();
			}

		},

		_onEmptyElement: function() {
			this.showContent();
		},

		_onPropertiesChange: function(new_widget_properties) {

			this._storeProperties(new_widget_properties);

			if (new_widget_properties.isValid()) {
				this.showContent();
			} else {
				this.showErrors(new_widget_properties.errors());
			}

		},

		resetWidget: function() {
			this._errors = null;
			this.$element().html('');
		},

		showContent: function() {
			this.resetWidget();
			var $helloWorld = $( document.createElement( 'div' ) );
            $helloWorld.html( 'Hello World from the extension "SimpleHelloWorld"<br/>' );
			this.$element().append( $helloWorld );

            $("<p>Click</p>").click(function() { authorize(props.space(), props.password())}).appendTo(this.$element());
		},

		showErrors: function(errors) {
			this.resetWidget();
			this._errors = errors;
			this.$element().html(errors.join('<br>'));
		},

		_isPropertiesChanged: function(widget_properties) {
			return (
				(!this._widget_properties)
				||
				(!widget_properties.isEqual(this._widget_properties))
			);
		},

		_storeProperties: function(widget_properties) {
			this._widget_properties = widget_properties;
		},

		_storeElement: function($element) {
			this._$element = $element;
		}

	};

	return Widget;

});
