/**
 * Model ServicioProducto.
 * @type {*|{}|Model}
 */
DTG.Model.ServicioProducto = DTG.Sequelize.define('ServicioProducto', {
    nombre: {
        type: DTG.Lib.Sequelize.STRING(128),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DTG.Lib.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    tipo: {
        type: DTG.Lib.Sequelize.STRING(15),
        allowNull: false
    }
},{
    tableName: 'servicio_producto',
    underscored: true
});