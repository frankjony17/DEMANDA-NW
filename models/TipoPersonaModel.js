/**
 * Model TipoPersona.
 * @type {*|{}|Model}
 */
DTG.Model.TipoPersona = DTG.Sequelize.define('TipoPersona', {
    nombre: {
        type: DTG.Lib.Sequelize.STRING(25),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DTG.Lib.Sequelize.STRING
    }
},{
    tableName: 'persona_tipo',
    underscored: true
});