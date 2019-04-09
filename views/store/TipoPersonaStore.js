
Ext.define('DTG.store.TipoPersonaStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: ['id', 'nombre', 'descripcion'],
    listeners: {
        load: function () {
            var me = this, data = [];
            DTG.Model.TipoPersona.findAll().then(function(record){
                if (record.length > 0) {
                    record.forEach(function(row){
                        data.push(row.dataValues);
                    });
                    me.loadData(data);
                } else {
                    DTG.Repository.Base.addTipoPersona(me);
                }
            });
        }
    }
});