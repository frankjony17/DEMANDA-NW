/**
 * Model UserModel.
 * @type {*|{}|Model}
 */
DTG.Model.User = DTG.Sequelize.define('User', {
    username: {
        type: DTG.Lib.Sequelize.STRING(25),
        allowNull: false,
        unique: true
    },
    password: {
        type: DTG.Lib.Sequelize.STRING(120),
        allowNull: false
    },
    fullName: {
        type: DTG.Lib.Sequelize.STRING(65),
        allowNull: false,
        field: 'full_name'
    },
    dateLastLogin: {
        type: DTG.Lib.Sequelize.DATE,
        field: 'date_last_login'
    },
    key: {
        type: DTG.Lib.Sequelize.STRING(120),
        allowNull: false
    }
},{
    tableName: 'user',
    underscored: true
});