define([ "jquery", "socketio" ], function($) {
    var socket = io.connect();
    
    return {
        game : "got9",

        player : null,

        players : {},

        pieces : {},

        load : function(callback) {
            var loader = require("loader");

            $.getJSON(loader.game + "/" + loader.game + ".json", function(data) {
                loader.players = data.players;

                $.each(data.pieces, function(index, item) {
                    var src = loader.game + "/" + (item.owner ? item["src-down"] : item.src);
                    var div = $("<div style='width: 0; height: 0;'><img class='pieces' src='" + src + "' style='position: relative; top: " + item.y + "px; left: " + item.x + "px; z-index: 5;'/></div>").appendTo(".anchor");
                    var image = $("img", div).get(0);
                    image.data = item;
                    image.data.id = index;
                    loader.pieces[index] = image;
                });

                $.each(data.board, function(index, item) {
                    $("<div style='width: 0; height: 0;'><img class='board' src='" + loader.game + "/" + item.src + "' style='position: relative; top: " + item.y + "px; left: " + item.x + "px; z-index: 3;'/></div>").mousedown(function(event) {
                        if (event.preventDefault) {
                            event.preventDefault();
                        }
                    }).appendTo(".anchor");
                });
                
                socket.emit("init");
                
                socket.on("init", function(message) {
                    for (pieceId in message) {
                        var item = message[pieceId];
                        var piece = $(loader.pieces[pieceId]);
                        if(item.top && item.left) {
                            piece.css({
                                top : item.top,
                                left : item.left
                            });
                        }
                        if(item.face) {
                            piece.attr("src", loader.game + "/" + piece.get(0).data["src-" + item.face]);
                        }
                    }
                });

                if (callback) {
                    callback();
                }
            });
        }
    };
});