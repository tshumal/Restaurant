App.model.Store = Backbone.Model.extend({

    urlRoot: App.config.getProperty('serverURL')+"stores/",
    
    defaults: {
    	id : 0,
        name: '',
        phone: 0,
        address: '',
        latitude: 0.000000,
        longitude: 0.000000,
        image: ''
    },
    
    initialize:function () {
        
    }
});

App.collection.StoreCollection = Backbone.Collection.extend({

    model:App.model.Store,

    url:App.config.getProperty('serverURL')+"stores"

});