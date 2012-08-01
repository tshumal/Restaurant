App.model.Reserve = Backbone.Model.extend({

    urlRoot: App.config.getProperty('serverURL')+"reserves/",
    
    defaults: {
    	id : 0,
        numPeople: 0,
        date: '',
        store: null
    },    
    
    initialize:function () {
        
    }
});

App.collection.ReserveCollection = Backbone.Collection.extend({

    model:App.model.Reserve,

    url:App.config.getProperty('serverURL')+"reserves"

});