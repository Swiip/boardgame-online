define(["jquery", "jquery-ui-1.8.16.custom.min"], function($) {
    return {
        init: function() {
            $(".board").draggable();
        }
    };
});