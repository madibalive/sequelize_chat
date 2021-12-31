/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('App', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        key: {
            type: DataTypes.STRING,
            field: 'key',
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: true
        },
        token: {
            type: DataTypes.STRING,
            field: 'token',
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: true
        },
        timezone: {
            type: DataTypes.STRING,
            field: 'timezone',
            allowNull: true
        },
        testKey: {
            type: DataTypes.STRING,
            field: 'test_key',
            allowNull: true
        },
        encryptionKey: {
            type: DataTypes.STRING(16),
            field: 'encryption_key',
            allowNull: true
        },
        preferences: {
            type: DataTypes.JSONB,
            field: 'preferences',
            allowNull: false,
            defaultValue: "\"{}\""
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
        ownerId: {
            type: DataTypes.INTEGER,
            field: 'owner_id',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'apps',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const App = model.App;
    const AppPackageIntegration = model.AppPackageIntegration;
    const AppUser = model.AppUser;
    const ArticleCollection = model.ArticleCollection;
    const ArticleSetting = model.ArticleSetting;
    const AssignmentRule = model.AssignmentRule;
    const BotTask = model.BotTask;
    const Campaign = model.Campaign;
    const Conversation = model.Conversation;
    const OutgoingWebhook = model.OutgoingWebhook;
    const QuickReply = model.QuickReply;
    const Role = model.Role;
    const AppPackage = model.AppPackage;
    const Agent = model.Agent;

    App.hasMany(AppPackageIntegration, {
        as: 'FkRails1288141b26s',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(AppUser, {
        as: 'FkRailsC4951bec77s',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(ArticleCollection, {
        as: 'FkRails67a353c941s',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(ArticleSetting, {
        as: 'FkRailsD7c60abac0s',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(AssignmentRule, {
        as: 'FkRails46de859780s',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(BotTask, {
        as: 'FkRailsF778d52dffs',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(Campaign, {
        as: 'FkRailsF646524d6as',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(Conversation, {
        as: 'FkRailsD2f2a92e1ds',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(OutgoingWebhook, {
        as: 'FkRailsCcc33e8ee5s',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(QuickReply, {
        as: 'FkRails994cc0ac2bs',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.hasMany(Role, {
        as: 'FkRails54f9cd362cs',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.belongsToMany(AppPackage, {
        as: 'AppPackageIntegrationAppPackages',
        through: AppPackageIntegration,
        foreignKey: 'app_id',
        otherKey: 'app_package_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    App.belongsToMany(Agent, {
        as: 'RoleAgents',
        through: Role,
        foreignKey: 'app_id',
        otherKey: 'agent_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
