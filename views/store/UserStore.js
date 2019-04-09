
Ext.define('DTG.store.UserStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: [ 'id', 'username', 'full_name', 'date_last_login', 'key' ],
    listeners: {
        load: function () {
            var me = this, data = [];
            DTG.Model.User.findAll().then(function(record){
                record.forEach(function(row){
                    data.push(row.dataValues);
                });
                me.loadData(data);
            });
        }
    }
});