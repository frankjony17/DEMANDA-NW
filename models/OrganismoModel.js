/**
 * Model Organismo
 * @type {*|{}|Model}
 */
DTG.Model.Organismo = DTG.Sequelize.define('Organismo', {
    nombre: {
        type: DTG.Lib.Sequelize.STRING(128),
        unique: true,
        allowNull: false
    },
    acronimo: {
        type: DTG.Lib.Sequelize.STRING(25),
        unique: true,
        allowNull: true
    },
    direccion: {
        type: DTG.Lib.Sequelize.STRING
    }
},{
    tableName: 'organismo',
    underscored: true
});