define([ "jquery", "jquery-ui" ], function($) {
    return {
        start : function(callback) {
            if(callback) {
            	callback();
            }
        }
    };
});