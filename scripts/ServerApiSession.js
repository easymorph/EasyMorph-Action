define(function(require)
{
	var model = require('model');
	var utils = require('utils');
    var CancellablePromise = require('./CancellablePromise');
	var NotificationHub = require('./NotificationHub');

	function ServerApiSession(host, space, client, notification_hub)
	{
		if (typeof host !== 'string') {
			throw new TypeError('\'host\' argument should be a string');
		}

		if (typeof space !== 'string') {
			throw new TypeError('\'space\' argument should be a string');
		}

		if (client === null) {
			throw new TypeError('\'client\' argument should be a EMSClient object');
		}

		if (notification_hub === null) {
			throw new TypeError('\'notification_hub\' argument should be a NotificationHub object');
		}

		this._host = host;
		this._space = space;
		this._client = client;
		this._notification_hub = notification_hub;
	};

    ServerApiSession.CreateEMSClient = function(host)
    {
    	var sessionKey = null;

        var options = new utils.EMSClientOptions();
        options.serverUrl = host;
        // timeout is set to 30 seconds in order to show Server unreachable."
        // error messages instead of "Server timeout"
        // when host is specified incorrectly.
        options.timeout = 30e3;
        // options.onClientUnauthorizedCallback = function (sender) {};
        options.storeAuthSession = function (sender, session) {
            sessionKey = session;
        };
        options.getAuthSession = function (sender) {
            return sessionKey;
        };

        return new utils.EMSClient(options);
    };

	ServerApiSession.Start = function(host, space, password)
	{
		if (typeof host !== 'string')
			throw new TypeError('\'host\' argument should be a string');

		if (typeof space !== 'string')
			throw new TypeError('\'space\' argument should be a string');

		if ((typeof password !== 'string') && (password !== null))
			throw new TypeError('\'password\' argument should be a string or null');

        return new CancellablePromise(function(resolve, reject)
        {
            var client = ServerApiSession.CreateEMSClient(host);

            // For non-anonymous spaces - login and start a session
            if (password !== null && password.length > 0)
            {
                client.login("Space", space, password)
                    .then(
                        function(session_key)
                        {
                            var hub = new NotificationHub(host, session_key);
                            resolve(new ServerApiSession(host, space, client, hub));
                        },
                        reject
                    );
            }
            // For anonymous spaces - just create session object
            else
            {
                var hub = new NotificationHub(host, null);
                resolve(new ServerApiSession(host, space, client, hub));
            }
        });
	};

	ServerApiSession.prototype =
	{
		_host: null,
		_space: null,
		_client: null,
		_notification_hub: null,

		host: function()
		{
			return this._host;
		},

		space: function()
		{
			return this._space;
		},

		client: function()
		{
			return this._client;
		},

		notificationHub: function()
		{
			return this._notification_hub;
		},

		close: function()
		{
			this._client.emsClientOptions.storeAuthSession(null, null);
			this._notification_hub.stop();
		},

		getTasksList: function()
		{
			return utils.EMSClient.getTasksList(this._space);
		}
	};

	return ServerApiSession;
});
