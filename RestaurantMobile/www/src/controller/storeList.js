App.controller.StoreList = Backbone.View.extend({
	
	initialize: function(){
    	// Compile the template using underscore
        this.view = _.template(App.view.get('storeList'));
        this.model.bind("reset", this.render, this);
        this.render();
    },
    events: {
        "click a.back": "back"
    },
    render: function(){
    	App.view.changePage(this);
    	return this;
    },
    back: function(){    	
    	window.history.back();
    }
});