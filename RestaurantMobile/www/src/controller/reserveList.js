App.controller.ReserveList = Backbone.View.extend({
	
	initialize: function(){
    	// Compile the template using underscore
        this.view = _.template(App.view.get('reserveList'));
        this.model.bind("reset", this.render, this);
        this.render();
    },
    events: {
        "click a.back": "back"
    },
    render: function(){
    	//Triggers the model refresh to be pased to the view
    	this.model.change();
    	//Show the View
    	App.view.changePage(this);
    	return this;
    },
    back: function(){    	
    	window.history.back();
    }
});