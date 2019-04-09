
Ext.define('DTG.store.SectorStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: ['id', 'nombre', 'descripcion'],
    listeners: {
        load: function () {
            var me = this, data = [];
            DTG.Model.Sector.findAll().then(function(sector){
                if (sector.length > 0) {
                    sector.forEach(function(row){
                        data.push(row.dataValues);
                    });
                    me.loadData(data);
                } else {
                    DTG.Repository.Base.addSector(me);
                }
            }).catch(function(error){
                console.log(error);
            });
        }
    }
});