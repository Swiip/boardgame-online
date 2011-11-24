define(["jquery"], function($) {
    return {
        load: function(callback) {
            var game = "got9";
            $.getJSON(game + "/" + game + ".json", function(data) {
                $.each(data.pieces, function(index, item){
                    $("<div style='width: 0; height: 0;'><img class='pieces' src='" + game + "/" + item.src + "' style='position: relative; top: " + item.x + "px; left: " + item.y + "px; z-index: 5;'/></div>").appendTo(".anchor");
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