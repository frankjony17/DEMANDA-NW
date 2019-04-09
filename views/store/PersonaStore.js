
Ext.define('DTG.store.PersonaStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: ['id', 'nombre', 'apellidos', 'ci', 'movil', 'telefonos', 'cargo', 'empresa', 'tipo_persona', 'cargo_id', 'empresa_id', 'tipo_persona_id'],
    sorters: 'apellidos',
    groupField: 'empresa',
    listeners: {
        load: function () {
            var me = this, data = [];
            DTG.Model.Persona.findAll({
                include: [{
                    model: DTG.Model.Cargo,
                    where: { id: DTG.Lib.Sequelize.col('persona.cargo_id')}
                },{
                    model: DTG.Model.Empresa,
                    where: { id: DTG.Lib.Sequelize.col('persona.empresa_id')}
                },{
                    model: DTG.Model.TipoPersona,
                    where: { id: DTG.Lib.Sequelize.col('persona.tipo_persona_id')}
                }]
            }).then(function(array){
                array.forEach(function(obj){;
                    data.push({
                        id: obj.id,
                        nombre: obj.nombre,
                        apellidos: obj.apellidos,
                        ci: obj.ci,
                        movil: obj.movil,
                        telefonos: obj.telefonos,
                        cargo: obj.Cargo.nombre,
                        empresa: obj.Empresa.nombre,
                        tipo_persona: obj.TipoPersona.nombre,
                        cargo_id: obj.cargo_id,
                        empresa_id: obj.empresa_id,
                        tipo_persona_id: obj.tipo_persona_id
                    });
                });
                me.loadData(data);
            }).catch(function(error){
                console.log(error);
            });
        }
    }
});