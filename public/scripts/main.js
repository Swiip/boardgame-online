require(["jquery", "loader", "controls"], function($, loader, controls) {
    //the jquery.alpha.js and jquery.beta.js plugins have been loaded.
    $(function() {
        loader.load(controls.init); 
    });
});
