require({
	paths: {
		jquery: "libs/jquery-1.7.1",
		jqueryui: "libs/jqueryui-1.8.16/jqueryui",
		socketio: "libs/socketio-0.8.7/socket.io.min"
	}
},[
   "jquery",
   "loader",
   "controls",
   "initializer"
], function($, loader, controls, initializer) {
    $(function() {
        loader.load(function() {
        	controls.init(function() {
        		initializer.start();
        	});
        });
    });
});
