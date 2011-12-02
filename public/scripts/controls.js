define([ "jquery", "underscore", "loader", "text!templates/contextmenu.html", "jqueryui/draggable", "socketio", "jquery/contextmenu" ], function($, _, loader, contextmenu) {
    var socket = io.connect();

    return {
        init : function(callback) {
            var controls = require("controls");
            controls.board();
            controls.pieces();
            socket.on("move", controls.remoteMove);
            socket.on("face", controls.remoteFace);
            
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
        	var contextMenu = $(contextmenu).appendTo("body");
        	
            $(".pieces").draggable({
                drag : function(event, ui) {
                    socket.emit("move", {
                        id : ui.helper.get(0).data.id,
                        top : ui.position.top,
                        left : ui.position.left,
                        player : loader.player.id
                    });
                }
            }).mousedown(function() {
                return false;
            }).each(function(index, item) {
            	if(item.data.owner == loader.player.id) {
            		$(item).contextMenu({
            			menu: contextMenu
            		}, function(action, element, position) {
            			$(item).attr("src", loader.game + "/" + item.data["src-" + (action == "private" ? "up" : action)]);
            			$(item).css("opacity", action == "private" ? 0.6 : 1);
            			socket.emit("face", {
                            id : item.data.id,
                            face : (action == "private" ? "down" : action),
                            player : loader.player.id
                        });
            		});
            	}
            });
        },
        
        remoteMove: function(message) {
        	var piece = $(loader.pieces[message.id]);
        	piece.css({
               top: message.top,
               left: message.left
            });
            require("controls").hilight(piece, message.player);
        },
        
        remoteFace: function(message) {
        	var piece = $(loader.pieces[message.id]);
        	piece.attr("src", loader.game + "/" + piece.get(0).data["src-" + message.face]);
        	require("controls").hilight(piece, message.player);
        },
        
        hilight: function(element, playerId) {
        	var pieceData = element.get(0).data;
        	var player = loader.players[playerId];
        	element.css("box-shadow", "0 0 10px 10px " + player.color + ", 0 0 10px 10px " + player.color + " inset");
        	pieceData.hilight = new Date().getTime();
        	setTimeout(function() {
        		if(pieceData.hilight + 450 < new Date().getTime()) {
        			element.css("box-shadow", "");
        		}
        	}, 500);
        }
    };
});