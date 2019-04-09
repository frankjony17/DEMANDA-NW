
Ext.define('DTG.store.EmpresaStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: ['id', 'nombre', 'acronimo', 'direccion', 'correo', 'telefonos', 'organismo', 'organismo_id'],
    sorters: 'nombre',
    groupField: 'organismo',
    listeners: {
        load: function () {
            var me = this, data = [];
            DTG.Model.Empresa.findAll({
                include: [{
                    model: DTG.Model.Organismo,
                    where: { id: DTG.Lib.Sequelize.col('empresa.organismo_id')}
                }]
            }).then(function(array){
                array.forEach(function(obj){;
                    data.push({
                        id: obj.id,
                        nombre: obj.nombre,
                        acronimo: obj.acronimo,
                        direccion: obj.direccion,
                        correo: obj.correo,
                        telefonos: obj.telefonos,
                        organismo: obj.Organismo.nombre,
                        organismo_id: obj.organismo_id
                    });
                });
                me.loadData(data);
            }).catch(function(error){
                console.log(error);
            });
        }
    }
});