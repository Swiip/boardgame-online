require({
	paths: {
		jquery: "libs/jquery-1.7.1",
		"jquery/contextmenu": "libs/jquery.plugins/jquery.contextMenu-1.0.1",
		jqueryui: "libs/jqueryui-1.8.16/jqueryui",
		underscore: "libs/underscore-1.2.2",
		socketio: "libs/socketio-0.8.7/socket.io",
		text: "libs/text-1.0.2",
		templates: "../templates"
	}
},[
   "jquery",
   "loader",
   "controls",
   "initializer"
], function($, loader, controls, initializer) {
    $(function() {
        loader.load(function() {
    		initializer.start(function() {
    			controls.init();
        	});
        });
    });
});
