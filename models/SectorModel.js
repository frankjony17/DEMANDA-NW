/**
 * Model Sector.
 * @type {*|{}|Model}
 */
DTG.Model.Sector = DTG.Sequelize.define('Sector', {
    nombre: {
        type: DTG.Lib.Sequelize.STRING(50),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DTG.Lib.Sequelize.STRING
    }
},{
    tableName: 'sector',
    underscored: true
});