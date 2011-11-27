define(["jquery"], function($) {
    return {
        pieces: {},
        
        load: function(callback) {
            var game = "got9";
            $.getJSON(game + "/" + game + ".json", function(data) {
                $.each(data.pieces, function(index, item){
                    var div = $("<div style='width: 0; height: 0;'><img class='pieces' src='" + game + "/" + item.src + "' style='position: relative; top: " + item.x + "px; left: " + item.y + "px; z-index: 5;'/></div>").appendTo(".anchor");
                    var image = $("img", div).get(0);
                    image.functionalId = item.id;
                    require("loader").pieces[item.id] = image;
                });
                
                $.each(data.board, function(index, item){
                    $("<div style='width: 0; height: 0;'><img class='board' src='" + game + "/" + item.src + "' style='position: relative; top: " + item.x + "px; left: " + item.y + "px; z-index: 3;'/></div>").mousedown(function(event) {
                        if(event.preventDefault) {
                            event.preventDefault();
                        }
                    }).appendTo(".anchor");
                });
                
                callback();
            });
        }
    };
});