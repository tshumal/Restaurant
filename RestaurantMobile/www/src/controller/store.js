App.controller.StoreList = Backbone.View.extend({
		//el: $( "#default" ),
	
        initialize: function(){
            this.render();
            console.log('Loading App.controller.StoreList');
        },
        render: function(){
            // Compile the template using underscore
            this.template = _.template(App.view.get('storeList'));
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( template );
        }
    });