
Ext.define('DTG.store.ServicioProductoStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: ['id', 'nombre', 'descripcion', 'tipo'],
    sorters: 'nombre',
    groupField: 'tipo',
    listeners: {
        load: function () {
            var me = this, data = [];
            DTG.Model.ServicioProducto.findAll().then(function(record){
                if (record.length > 0) {
                    record.forEach(function(row){
                        data.push(row.dataValues);
                    });
                    me.loadData(data);
                } else {
                    DTG.Repository.Base.addServicioProducto(me);
                }
            });
        }
    }
});