/**
 * Model Persona
 * @type {*|{}|Model}
 */
DTG.Model.Persona = DTG.Sequelize.define('Persona', {
    nombre: {
        type: DTG.Lib.Sequelize.STRING(32),
        allowNull: false
    },
    apellidos: {
        type: DTG.Lib.Sequelize.STRING(32),
        allowNull: false
    },
    direccion: {
        type: DTG.Lib.Sequelize.STRING
    },
    ci: {
        type: DTG.Lib.Sequelize.BIGINT(11)
        //unique: true
    },
    movil: {
        type: DTG.Lib.Sequelize.STRING(12)
    },
    telefonos: {
        type: DTG.Lib.Sequelize.STRING(25)
    }
},{
    tableName: 'persona',
    underscored: true
});