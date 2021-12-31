/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ArticleSetting', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        domain: {
            type: DataTypes.STRING,
            field: 'domain',
            allowNull: true
        },
        subdomain: {
            type: DataTypes.STRING,
            field: 'subdomain',
            allowNull: true
        },
        properties: {
            type: DataTypes.JSONB,
            field: 'properties',
            allowNull: true,
            defaultValue: "{}"
        },
        appId: {
            type: DataTypes.BIGINT,
            field: 'app_id',
            allowNull: false,
            references: {
                model: 'apps',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
        tableName: 'article_settings',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ArticleSetting = model.ArticleSetting;
    const App = model.App;

    ArticleSetting.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
