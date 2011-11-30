define([ "jquery", "loader", "text!templates/players.html", "jqueryui/dialog", "jsrender" ], function($, loader, players) {
    return {
        start : function(callback) {
            $($.render(loader.players, players)).dialog({
            	modal: true,
            	close: callback
            });
        }
    };
});