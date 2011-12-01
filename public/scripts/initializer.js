define([ "jquery", "underscore", "loader", "text!templates/players.html", "jqueryui/dialog" ], function($, _, loader, players) {
    return {
        start : function(callback) {
        	$(_.template(players, loader)).dialog({
            	modal: true,
            	open: function(event) {
            		var dialog = $(event.target);
            		$(".player", dialog).click(function(event) {
            			var playerKey = $(".data", $(event.target).closest("td")).html();
            			loader.player = loader.players[playerKey];
            			dialog.dialog("close");
            		});
            	},
            	close: callback
            });
        }
    };
});