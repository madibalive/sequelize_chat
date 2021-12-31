/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ConversationSource', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        conversationId: {
            type: DataTypes.BIGINT,
            field: 'conversation_id',
            allowNull: false,
            references: {
                model: 'conversations',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        appPackageIntegrationId: {
            type: DataTypes.BIGINT,
            field: 'app_package_integration_id',
            allowNull: false,
            references: {
                model: 'app_package_integrations',
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
        tableName: 'conversation_sources',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ConversationSource = model.ConversationSource;
    const Conversation = model.Conversation;
    const AppPackageIntegration = model.AppPackageIntegration;

    ConversationSource.belongsTo(Conversation, {
        as: 'Conversation',
        foreignKey: 'conversation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    ConversationSource.belongsTo(AppPackageIntegration, {
        as: 'AppPackageIntegration',
        foreignKey: 'app_package_integration_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
