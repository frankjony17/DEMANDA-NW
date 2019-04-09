/**
 * Model Cargo.
 * @type {*|{}|Model}
 */
DTG.Model.Cargo = DTG.Sequelize.define('Cargo', {
    nombre: {
        type: DTG.Lib.Sequelize.STRING(25),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DTG.Lib.Sequelize.STRING
    }
},{
    tableName: 'cargo',
    underscored: true
});