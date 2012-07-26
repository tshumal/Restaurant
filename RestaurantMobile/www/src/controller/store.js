App.controller.StoreList = Backbone.View.extend({
	
	initialize: function(){
    	// Compile the template using underscore
        this.view = _.template(App.view.get('storeList'));
        //Initialize the Info
        this.stores = new App.collection.StoreCollection();
    	this.stores.fetch();
    	this.json = this.stores.toJSON();
    	console.log(this.json);
    },
    render: function(){
    	// Load the compiled HTML into the Backbone "el"
    	 $(this.el).html( this.view );
        return this;
    }
});