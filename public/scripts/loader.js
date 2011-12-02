define(["jquery"], function($) {
    return {
    	game: "got9",
    	
    	player: null,
    	
    	players: {},
    	
        pieces: {},
        
        load: function(callback) {
            var loader = require("loader");
        	
            $.getJSON(loader.game + "/" + loader.game + ".json", function(data) {
            	loader.players = data.players;
            	
                $.each(data.pieces, function(index, item){
                	var src = loader.game + "/" + (item.owner ? item["src-down"] : item.src);
                    var div = $("<div style='width: 0; height: 0;'><img class='pieces' src='" + src + "' style='position: relative; top: " + item.y + "px; left: " + item.x + "px; z-index: 5;'/></div>").appendTo(".anchor");
                    var image = $("img", div).get(0);
                    image.data = item;
                    image.data.id = index;
                    loader.pieces[index] = image;
                });
                
                $.each(data.board, function(index, item){
                    $("<div style='width: 0; height: 0;'><img class='board' src='" + loader.game + "/" + item.src + "' style='position: relative; top: " + item.y + "px; left: " + item.x + "px; z-index: 3;'/></div>").mousedown(function(event) {
                        if(event.preventDefault) {
                            event.preventDefault();
                        }
                    }).appendTo(".anchor");
                });
                
                if(callback) {
                	callback();
                }
            });
        }
    };
});