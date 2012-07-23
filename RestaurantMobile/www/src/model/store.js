App.model.Store = Backbone.Model.extend({

    urlRoot:"../api/employees",
    
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
    	console.log('Loading App.model.Store');
        this.stores = new App.collection.StoreCollection();
        this.stores.url = '../api/employees/' + this.id + '/reports';
    }

});

App.collection.StoreCollection = Backbone.Collection.extend({

    model:App.model.Store,

    url:"../api/employees",

    findByName:function (key) {
        var url = (key == '') ? '../api/employees' : "../api/employees/search/" + key;
        console.log('findByName: ' + key);
        var self = this;
        $.ajax({
            url:url,
            dataType:"json",
            success:function (data) {
                console.log("search success: " + data.length);
                self.reset(data);
            }
        });
    }

});