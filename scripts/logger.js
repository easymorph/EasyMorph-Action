define(function()
{
    var is_logging = false;

    var empty_function = function(){};

    return {

        isLogging: function()
        {
            return is_logging;
        },

        log: empty_function,

        on: function()
        {
            is_logging = true;
            this.log = console.log;
        },

        off: function()
        {
            is_logging = false;
            this.log = empty_function;
        }
    };
});


