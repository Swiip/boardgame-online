define([ "jquery", "jqueryui/draggable", "socketio" ], function($) {
    var socket = io.connect();

    return {
        init : function(callback) {
            var controls = require("controls");
            controls.board();
            controls.pieces();
            socket.on("move", controls.remoteMove);
            
            if(callback) {
            	callback();
            }
        },

        mousedownEvent : null,

        board : function() {
            var controls = require("controls");
            $("html").mousedown(function(event) {
                controls.mousedownEvent = event;
            }).mousemove(function(event) {
                if (controls.mousedownEvent !== null) {
                    var position = $(".anchor").offset();
                    $(".anchor").css({
                        top : position.top + event.pageY - controls.mousedownEvent.pageY,
                        left : position.left + event.pageX - controls.mousedownEvent.pageX
                    });
                    controls.mousedownEvent = event;
                }
            }).mouseup(controls.dragFinish).mouseout(controls.dragFinish);
        },

        dragFinish : function() {
            require("controls").mousedownEvent = null;
        },

        pieces: function() {
            $(".pieces").draggable({
                drag : function(event, ui) {
                    //console.log("position : position", ui.helper.css("position"), ", left", ui.helper.css("left"), ", top", ui.helper.css("top"));
                    socket.emit("move", {
                        id : ui.helper.get(0).functionalId,
                        top : ui.position.top,
                        left : ui.position.left
                    });
                }
            }).mousedown(function() {
                return false;
            });
        },
        
        remoteMove: function(message) {
            $(require("loader").pieces[message.id]).css({
               top: message.top,
               left: message.left
            });
        }
    };
});