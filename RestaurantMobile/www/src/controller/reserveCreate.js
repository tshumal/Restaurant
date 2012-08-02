App.controller.ReserveCreate = Backbone.View.extend({
	
	initialize: function(){
    	// Compile the template using underscore
        this.view = _.template(App.view.get('reserveCreate'));
        this.model.bind("reset", this.render, this);
        this.render();
    },
    events: {
        "click a.back": "back",
        "click a.save": "save"
    },
    render: function(){
    	//Triggers the model refresh to be passed to the view
    	this.model.change();
    	//Show the view
    	App.view.changePage(this);
    	return this;
    },
    back: function(){
    	window.history.back();
    },
    save: function(){
    	console.log('month: ' + this.$('#date-month').val());
    	console.log('day: ' + this.$('#date-day').val());
    	console.log('year: ' + this.$('#date-year').val());
    	var date = new Date(this.$('#date-year').val(), this.$('#date-month').val(), this.$('#date-day').val());
    	console.log(date);
    }
});