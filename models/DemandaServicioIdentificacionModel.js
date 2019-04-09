/**
 * Model DemandaServicioIdentificacion.
 * @type {*|{}|Model}
 */
DTG.Model.DemandaServicioIdentificacion = DTG.Sequelize.define('DemandaServicioIdentificacion', {
    identificacion: {
        type: DTG.Lib.Sequelize.STRING,
        allowNull: false
    },
    direccionPostal: {
        type: DTG.Lib.Sequelize.STRING,
        allowNull: false,
        field: 'direccion_postal'
    }
},{
    tableName: 'demanda_servicio_identificacion',
    underscored: true
});