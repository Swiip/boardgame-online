define(["jquery"], function($) {
    return {
        load: function(callback) {
            var game = "got9";
            $.getJSON(game + "/" + game + ".json", function(data) {
                $.each(data.board, function(index, item){
                    $("<img class='board' src='" + game + "/" + item.src + "' style='position: absolute; left: 0; top: 0;'/>").appendTo("body");
                });
                callback();
            });
        }
    };
});