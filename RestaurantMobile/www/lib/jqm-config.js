$(document).bind("mobileinit", function(){
	//Remove Page and dialog Transition Effects to 
	//improve performance and some issues
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	//Disable JqueryMobile Routing Capabilities
	$.mobile.ajaxEnabled = false;
    $.mobile.linkBindingEnabled = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
    //Remove page from DOM when it's being replaced
    $("div:jqmData(role='page')").on('pagehide', function (event, ui) {
	    $(event.currentTarget).remove();
	});
});