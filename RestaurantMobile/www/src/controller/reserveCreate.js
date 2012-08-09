App.controller.ReserveCreate = Backbone.View.extend({
	
	initialize: function(){
    	// Compile the template using underscore
        this.view = _.template(App.view.get('reserveCreate'));
        this.model.bind("reset", this.render, this);
        this.render();
    },
    events: {
    	"change"      : "change",
        "click a.back": "back",
        "click a.save": "save"
    },
    render: function(){
    	//Triggers the model refresh to be passed to the view
    	this.model.change();
    	//Show the view
    	App.view.changePage(this);
    	//Render the date field
    	App.view.renderDate('date');
    	return this;
    },
    back: function(){
    	window.history.back();
    },
    change: function (event) {
        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.id] = target.value;
        this.model.set(change);
        
        //Refresh the date field
    	App.view.renderDate('date');
        
        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
        	App.utils.addValidationError(target.id, check.message);
        } else {
        	App.utils.removeValidationError(target.id);
        }
    },
    save: function(){    	
    	
    	console.log('month: ' + this.$('#date-month').val());
    	console.log('day: ' + this.$('#date-day').val());
    	console.log('year: ' + this.$('#date-year').val());
    	var date = new Date(this.$('#date-year').val(), this.$('#date-month').val(), this.$('#date-day').val());
    	console.log(date);
    	
    	var check = this.model.validateAll();
        if (check.isValid === false) {
        	App.utils.displayValidationErrors(check.messages);
            return false;
        }
    }
});