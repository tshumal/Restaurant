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
    	//Render the date field with the initial value
    	App.view.renderDate('date', 2012, 2030, this.model.get('date'));
    	return this;
    },
    //Fired when the user select back in his browser
    back: function(){
    	window.history.back();
    },
    //Fired when there is a change event on the view
    change: function (event) {
    	// Apply the change to the model
        var target = event.target;
        var change = {};
        var name = target.id;
        change[name] = target.value;
        //The model attribute is set
        this.model.set(change);
        
        //Refresh the date field
    	App.view.renderDate('date', 2012, 2030);
        
        //If the event corresponds to a date type 
        //the target will be replaced for the attribute name
        //so the complete field will be validated
        if (name.indexOf("-year") != -1 ||
        		name.indexOf("-month") != -1 ||
        		name.indexOf("-day") != -1){
        	//name is now the model name
        	name = 'date';
        }
        
        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(name);
        if (check.isValid === false) {
        	App.utils.addValidationError(name, check.message);
        } else {
        	App.utils.removeValidationError(name);
        }
    },
    //Fired to save a reserve recently created
    save: function(){
    	//Run validation on all the model if it passes the model will be saved
    	var check = this.model.validateAll();
        if (check.isValid === false) {
        	App.utils.displayValidationErrors(check.messages);
            return false;
        }
    }
});