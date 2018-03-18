require.config({
    paths: {
        "signalR": "../extensions/EasyMorph-Action/server-api/jquery.signalR-2.2.2.min",
        "ems-sha256": "../extensions/EasyMorph-Action/server-api/ems-sha256.min",
        "dto": "../extensions/EasyMorph-Action/server-api/dto",
        "utils": "../extensions/EasyMorph-Action/server-api/utils",
        "model": "../extensions/EasyMorph-Action/server-api/model"
    },
    shim: {
        'signalR': {
            deps: ['jquery'],
            exports: "jQuery.signalR"
        },
        'hubs': {
            deps: ['signalR'],
            exports: "jQuery.signalR.hub"
        }
    }
    /*
    // Doesn't work. Hangs up scripts loading.
    map: {
        "utils": {
            "sha256": "./server-api/sha256.min"
        }
    }
    */
});

define([
        "jquery",
        "./properties",
        "./scripts/logger",
        "./scripts/Extension",
        "client.property-panel/components/components",
        "./components/password/password",
        "css!./styles.css"
    ],
    function ($, properties, logger, Extension, components, password_component)
    {
        'use strict';

        logger.off();

        components.addComponent("em-action-password", password_component);

        var extension = new Extension();

        return {
            initialProperties: {
                host: '',
                space: '',
                password: '',
                task_id: '',
                label: '',
                task_parameters: [],
                reload_app: false,
                partial_reload: false
            },
            definition : properties,
            paint: extension.onPaint.bind(extension)
        };
    }
);