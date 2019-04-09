
Ext.define('DTG.store.OrganismoStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: ['id', 'nombre', 'acronimo', 'direccion', 'sector', 'sector_id'],
    sorters: 'nombre',
    groupField: 'sector',
    listeners: {
        load: function () {
            var me = this, data = [];
            DTG.Model.Organismo.findAll({
                include: [{
                    model: DTG.Model.Sector,
                    where: { id: DTG.Lib.Sequelize.col('organismo.sector_id')}
                }]
            }).then(function(array){
                array.forEach(function(obj){
                    data.push({
                        id: obj.id,
                        nombre: obj.nombre,
                        acronimo: obj.acronimo,
                        direccion: obj.direccion,
                        sector: obj.Sector.nombre,
                        sector_id: obj.sector_id
                    });
                });
                me.loadData(data);
            }).catch(function(error){
                console.log(error);
            });
        }
    }
});