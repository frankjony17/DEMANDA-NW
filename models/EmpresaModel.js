/**
 * Model Empresa
 * @type {*|{}|Model}
 */
DTG.Model.Empresa = DTG.Sequelize.define('Empresa', {
    nombre: {
        type: DTG.Lib.Sequelize.STRING(128),
        unique: true,
        allowNull: false
    },
    acronimo: {
        type: DTG.Lib.Sequelize.STRING(25)
    },
    direccion: {
        type: DTG.Lib.Sequelize.STRING
    },
    correo: {
        type: DTG.Lib.Sequelize.STRING(64)
    },
    telefonos: {
        type: DTG.Lib.Sequelize.STRING(25)
    }
},{
    tableName: 'empresa',
    underscored: true
});