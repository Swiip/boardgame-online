require(["jquery", "loader", "controls", "initializer"], function($, loader, controls) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        loader.load(function() {
        	controls.init(function() {
        		initializer.start();
        	});
        });
    });
});
