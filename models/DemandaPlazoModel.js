/**
 * Model DemandaPlazo.
 * @type {*|{}|Model}
 */
DTG.Model.DemandaPlazo = DTG.Sequelize.define('DemandaPlazo', {
    plazoSolicitado: {
        type: DTG.Lib.Sequelize.DATE,
        allowNull: false,
        field: 'plazo_solicitado'
    },
    plazoAprobado: {
        type: DTG.Lib.Sequelize.DATE,
        field: 'plazo_aprobado'
    },
    estado: {
        type: DTG.Lib.Sequelize.STRING(12)
    }
},{
    tableName: 'demanda_plazo',
    underscored: true
});