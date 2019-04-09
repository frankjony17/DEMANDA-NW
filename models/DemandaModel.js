/**
 * Model Demanda.
 * @type {*|{}|Model}
 */
DTG.Model.Demanda = DTG.Sequelize.define('Demanda', {
    fechaSolicitud: {
        type: DTG.Lib.Sequelize.DATE,
        allowNull: false,
        field: 'fecha_solicitud'
    },
    fechaDemanda: {
        type: DTG.Lib.Sequelize.DATE,
        defaultValue: DTG.Lib.Sequelize.NOW,
        field: 'fecha_demanda'
    },
    year: {
        type: DTG.Lib.Sequelize.STRING(6)
    },
    estado: {
        type: DTG.Lib.Sequelize.STRING(15),
        allowNull: false
    }
},{
    tableName: 'demanda',
    underscored: true
});