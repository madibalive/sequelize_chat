/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AppPackage', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            field: 'description',
            allowNull: true
        },
        settings: {
            type: DataTypes.JSONB,
            field: 'settings',
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: true
        },
        url: {
            type: DataTypes.STRING,
            field: 'url',
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'app_packages',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const AppPackage = model.AppPackage;
    const AppPackageIntegration = model.AppPackageIntegration;
    const App = model.App;

    AppPackage.hasMany(AppPackageIntegration, {
        as: 'FkRails93b76ebd68s',
        foreignKey: 'app_package_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    AppPackage.belongsToMany(App, {
        as: 'AppPackageIntegrationApps',
        through: AppPackageIntegration,
        foreignKey: 'app_package_id',
        otherKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
