define([ "jquery", "text!templates/player.html", "jqueryui/dialog", "jsrender" ], function($, player) {
	console.log(player, $.render);
    return {
        start : function(callback) {
            $(player).dialog({
            	modal: true,
            	close: callback
            });
        }
    };
});