App.model.Store = Backbone.Model.extend({

    urlRoot: App.utils.getProperty('serverURL')+"stores/",
    
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

    url:App.utils.getProperty('serverURL')+"stores",
    
    //Method to be triggered to refresh the data that needs to be formatted
    change:function (){
    	//There is no data to be refreshed in this model
    }

});