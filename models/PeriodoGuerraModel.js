/**
 * Model PeriodoGuerra.
 * @type {*|{}|Model}
 */
DTG.Model.PeriodoGuerra = DTG.Sequelize.define('PeriodoGuerra', {
    etapa: {
        type: DTG.Lib.Sequelize.STRING(40),
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DTG.Lib.Sequelize.STRING(120),
        allowNull: false,
        unique: true
    }
},{
    tableName: 'periodo_guerra',
    underscored: true
});