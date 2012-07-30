App.model.Store = Backbone.Model.extend({

    urlRoot:"http://localhost:8080/RestaurantServer/rest/api/stores/",
    
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

    url:"http://localhost:8080/RestaurantServer/rest/api/stores"

});