/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AppPackageIntegration', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        appPackageId: {
            type: DataTypes.BIGINT,
            field: 'app_package_id',
            allowNull: false,
            references: {
                model: 'app_packages',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: false
        },
        externalId: {
            type: DataTypes.STRING,
            field: 'external_id',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'app_package_integrations',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const AppPackageIntegration = model.AppPackageIntegration;
    const ConversationSource = model.ConversationSource;
    const App = model.App;
    const AppPackage = model.AppPackage;
    const Conversation = model.Conversation;

    AppPackageIntegration.hasMany(ConversationSource, {
        as: 'FkRails4bb449dd09s',
        foreignKey: 'app_package_integration_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    AppPackageIntegration.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    AppPackageIntegration.belongsTo(AppPackage, {
        as: 'AppPackage',
        foreignKey: 'app_package_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    AppPackageIntegration.belongsToMany(Conversation, {
        as: 'ConversationSourceConversations',
        through: ConversationSource,
        foreignKey: 'app_package_integration_id',
        otherKey: 'conversation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
