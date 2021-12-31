/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ConversationChannel', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        provider: {
            type: DataTypes.STRING,
            field: 'provider',
            allowNull: true
        },
        providerChannelId: {
            type: DataTypes.STRING,
            field: 'provider_channel_id',
            allowNull: true
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
        tableName: 'conversation_channels',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ConversationChannel = model.ConversationChannel;
    const Conversation = model.Conversation;

    ConversationChannel.belongsTo(Conversation, {
        as: 'Conversation',
        foreignKey: 'conversation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
