define([ "jquery", "jquery-ui" ], function($) {
    return {
        start : function(callback) {
            var controls = require("controls");
            controls.board();
            controls.pieces();
            socket.on("move", controls.remoteMove);
            
            if(callback) {
            	callback();
            }
        }
    };
});