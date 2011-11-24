define(["jquery", "jquery-ui-1.8.16.custom.min"], function($) {
    return {
        init: function() {
            var controls = require("controls");
            controls.board();
            controls.pieces();
        },
        
        mousedownEvent: null,
        
        board: function() {
            var controls = require("controls");
            $("html").mousedown(function(event) {
                controls.mousedownEvent = event;
            }).mousemove(function(event) {
                if(controls.mousedownEvent !== null) {
                    var position = $(".anchor").offset();
                    $(".anchor").css({
                        top : position.top + event.pageY - controls.mousedownEvent.pageY ,
                        left : position.left + event.pageX - controls.mousedownEvent.pageX
                    });
                    controls.mousedownEvent = event;
                }
            }).mouseup(controls.dragFinish).mouseout(controls.dragFinish);
        },
        
        dragFinish: function() {
            require("controls").mousedownEvent = null;
        },
        
        pieces: function() {
            $(".pieces").draggable().mousedown(function() {
                return false;
            });
        }
    };
});