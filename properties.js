define(["jquery"], function ($)
{
    'use strict';

    var connection = {
        type: "items",
        label: "Connection",
        items: {
            host: {
                ref: 'host',
                type: 'string',
                label: 'Host and port (example: http://yourdomain.com:8080)',
                defaultValue: ''
            },
            space: {
                ref: 'space',
                type: 'string',
                label: 'Space',
                defaultValue: ''
            },
            password: {
                component: 'em-action-password',
                ref: 'password',
                type: 'string',
                label: 'Password',
                defaultValue: '',
                foo: "bar"
            },
            task_id: {
                ref: 'task_id',
                type: 'string',
                label: 'Task ID',
                defaultValue: ''
            },
            label: {
                ref: 'label',
                type: 'string',
                label: 'Label (optional)',
                defaultValue: ''
            }
            /*
            spacesList: {
                type: "string",
                component: "dropdown",
                label: "Spaces list",
                ref: "selected_space",
                options: function(layout, c, o) {
                    // console.log(arguments);
                    var host = layout.host;
                    if (host != "") {
                        // Load list of spaces here
                        return [{value: "foo", label: "FOO"}, {value: "bar", label: "BAR"}];
                    } else {
                        return [];
                    }
                },
                show: function(layout)
                {
                    return (layout.host != "");
                }
            }
            */
        }
    };

    var task_parameters = {
        type: "array",
        label: "Task parameters",
        addTranslation: "Add parameter",
        ref: "task_parameters",
        itemTitleRef: "name",
        allowAdd: true,
        allowRemove: true,
        allowMove: true,
        grouped: true,
        items: {
            name: {
                ref: 'name',
                type: 'string',
                label: 'Parameter name',
                defaultValue: ''
            },
            value: {
                ref: 'value',
                type: 'string',
                label: 'Parameter value',
                expression: 'optional',
                defaultValue: ''
            }
        }
    };

    var reload = {
        type: "items",
        label: "App reload",
        items: {
            reload_app: {
                ref: 'reload_app',
                type: 'boolean',
                label: 'Reload app when task finishes',
                defaultValue: false
            },
            partial_reload: {
                ref: 'partial_reload',
                type: 'boolean',
                label: 'Partial reload',
                defaultValue: false,
                show: function(layout)
                {
                    return (layout.reload_app === true);
                }
            }
        }
    };

    return {
        type : "items",
        component : "accordion",
        items : {
            appearance: {
                uses: "settings"
            },
            options: {
                component: "expandable-items",
                label: "Options",
                items: {
                    connection: connection,
                    task_parameters: task_parameters,
                    reload: reload
                }
            }
        }
    };
});