/**
 * Model DemandaServicioProducto.
 * @type {*|{}|Model}
 */
DTG.Model.DemandaServicioProducto = DTG.Sequelize.define('DemandaServicioProducto', {
    um: {
        type: DTG.Lib.Sequelize.STRING(25),
        allowNull: true
    }
},{
    tableName: 'demanda_servicio_producto',
    underscored: true
});