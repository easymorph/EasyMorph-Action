define(function(require) {

	var $ = require('jquery');
    var logger = require('./logger');
    var CancellablePromise = require('./CancellablePromise');
	var ServerApiSession = require('./ServerApiSession');
	var TaskApi = require('./TaskApi');
	var TaskState = require('./TaskState');
    var TaskConnection = require('./TaskConnection');
    var TaskControl = require('./TaskControl');

	function Widget(id) {

		if ( (typeof id !== 'string') || (id === '') ) {
			throw new TypeError('\'id\' argument should be ' +
				'a non-empty string');
		}

		this._id = id;
        this._task_connection_promise = CancellablePromise.cancel();
	};

	Widget.prototype = {

		_id: null,
		_widget_properties: null,
		_$element: null,
		_errors: null,

        _task_connection_promise: null,

		_api_session: null,
		_task_state: null,
        _task_control: null,

		$element: function() {
			return this._$element;
		},

		widgetProperties: function() {
			return this._widget_properties;
		},

        _validProperties: function(new_state)
        {
            return new CancellablePromise(function(resolve, reject)
            {
                var props = new_state.properties;

                if (props.isValid())
                {
                    resolve(props);
                }
                else
                {
                    reject(props.errors());
                }
            }
            .bind(this));
        },

        _apiSession: function(props)
        {
            if (this._api_session !== null)
            {
                return CancellablePromise.resolve(this._api_session);
            }
            else
            {
                return ServerApiSession.Start(
                    props.host(),
                    props.space(),
                    props.password()
                );
            }
        },

        _taskState: function(api_session)
        {
            if (this._task_state !== null)
            {
                return CancellablePromise.resolve(this._task_state);
            }
            else
            {
                var task_api = new TaskApi(api_session, this._widget_properties.taskId());
                var task_state = new TaskState(task_api, this._widget_properties);

                return new CancellablePromise(function(resolve, reject)
                {
                    task_state.connect()
                        .then(function()
                        {
                            resolve(task_state);
                        })
                        .catch(function(error)
                        {
                            reject(error);
                        });
                });
            }
        },

		onPaint: function($element, new_state, old_state, state_changes)
        {
			this._$element = $element;

            if (state_changes.isPropertiesChanged())
            {
                this._widget_properties = new_state.properties;
            }

            if (this._task_connection_promise.isPending())
            {
                if (
                    (state_changes.isConnectionPropertiesOrTaskIdChanged())
                    ||
                    (state_changes.isWidgetSizesChanged())
                    ||
                    ($element.html() === '')
                )
                {
                    this._task_connection_promise.cancelAll();
                }
                else
                {
                    return;
                }
            }

            if (state_changes.isConnectionPropertiesOrTaskIdChanged())
            {
                // Add something to $element in order not to mistakenly
                // repaint widget while properties are being processed
                this.$element().html(
                    '<div class="em-server-loading">Loading ...</div>'
                );
            };

            if (state_changes.isConnectionPropertiesChanged())
            {
                if (this._api_session !== null)
                {
                    this._api_session.close();
                }
                this._api_session = null;
                this._task_control = null;
                this._task_state = null;
            }

            if (state_changes.isTaskIdChanged())
            {
                if (this._api_session !== null)
                {
                    this._api_session.notificationHub().stop();
                }
                this._task_control = null;
                this._task_state = null;
            }

            var vaild_properties_promise = this._validProperties(new_state)
                .then(function(props)
                {
                    return props;
                }.bind(this));

            var api_session_promise = vaild_properties_promise
                .then(this._apiSession.bind(this))
                .then(function(api_session)
                {
                   this._api_session = api_session;
                   return api_session;
                });

            var task_state_promise = api_session_promise
                .then(this._taskState.bind(this))
                .then(function(task_state)
                {
                   var is_reconnected = (this._task_state === null);
                   this._task_state = task_state;

                   if (!is_reconnected || state_changes.isPropertiesChanged())
                   {
                       this._task_state.changeProperties(new_state.properties);
                   }

                   return is_reconnected;
                }.bind(this));

            this._task_connection_promise = task_state_promise
                .then(function(is_reconnected)
                {
                    var is_recreated = false;
                    if ((is_reconnected) || (this._task_control === null))
                    {
                        this._task_control = new TaskControl(this._task_state);
                        is_recreated = true;
                    }

                    // When propertie changes lead to task control recreation
                    // or widget sizes were changed
                    // or widget element is empty (because of a sheet change)
                    // - rerender widget content
                    if (
                        is_recreated
                        ||
                        state_changes.isWidgetSizesChanged()
                        ||
                        ($element.html() === '')
                    )
                    {
                        this.showContent();
                    }
                }
                .bind(this))
                .catch(function(error)
                {
                    logger.log(error);
                    this._storeErrors(error);
                    this.showErrors(this._errors);
                }
                .bind(this));
		},

		resetWidget: function()
        {
			this._errors = null;
			this.$element().html('');
		},

		showContent: function()
        {
            this.resetWidget();
            if (this._task_control)
            {
                this._task_control.appendTo(this._$element);
            }
		},

        _storeErrors: function(error)
        {
            if (error instanceof Array)
            {
                this._errors = error;
            }
            else if (typeof error.message !== 'undefined')
            {
                this._errors = [error.message];
            }
            else if (typeof error === 'string')
            {
                this._errors = [error];
            }
            else
            {
                this._errors = ["Unexpected error format:" + error];
            }
        },

		showErrors: function(errors) {
			this.resetWidget();
			this._errors = errors;
            this._task_control = null;
			this.$element().html(errors.join('<br>'));
		}
	};

	return Widget;

});
