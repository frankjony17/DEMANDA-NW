
Ext.define('DTG.store.PeriodoGuerraStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: ['id', 'etapa', 'descripcion'],
    listeners: {
        load: function () {
            var me = this, data = [];
            DTG.Model.PeriodoGuerra.findAll().then(function(record){
                if (record.length > 0) {
                    record.forEach(function(row){
                        data.push(row.dataValues);
                    });
                    me.loadData(data);
                } else {
                    DTG.Repository.Base.addPeriodoGuerra(me);
                }
            });
        }
    }
});