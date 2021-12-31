/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ConversationPart', {
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
        message: {
            type: DataTypes.TEXT,
            field: 'message',
            allowNull: true
        },
        readAt: {
            type: DataTypes.DATE,
            field: 'read_at',
            allowNull: true
        },
        appUserId: {
            type: DataTypes.BIGINT,
            field: 'app_user_id',
            allowNull: true,
            references: {
                model: 'app_users',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        conversationId: {
            type: DataTypes.BIGINT,
            field: 'conversation_id',
            allowNull: true,
            references: {
                model: 'conversations',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        privateNote: {
            type: DataTypes.BOOLEAN,
            field: 'private_note',
            allowNull: true
        },
        boolean: {
            type: DataTypes.BOOLEAN,
            field: 'boolean',
            allowNull: true
        },
        authorableType: {
            type: DataTypes.STRING,
            field: 'authorable_type',
            allowNull: true
        },
        authorableId: {
            type: DataTypes.BIGINT,
            field: 'authorable_id',
            allowNull: true
        },
        messageableType: {
            type: DataTypes.STRING,
            field: 'messageable_type',
            allowNull: true
        },
        messageableId: {
            type: DataTypes.BIGINT,
            field: 'messageable_id',
            allowNull: true
        },
        source: {
            type: DataTypes.STRING,
            field: 'source',
            allowNull: true
        },
        string: {
            type: DataTypes.STRING,
            field: 'string',
            allowNull: true
        },
        messageId: {
            type: DataTypes.STRING,
            field: 'message_id',
            allowNull: true
        },
        emailMessageId: {
            type: DataTypes.STRING,
            field: 'email_message_id',
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
        stepId: {
            type: DataTypes.STRING,
            field: 'step_id',
            allowNull: true
        },
        triggerId: {
            type: DataTypes.STRING,
            field: 'trigger_id',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'conversation_parts',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ConversationPart = model.ConversationPart;
    const ConversationPartChannelSource = model.ConversationPartChannelSource;
    const AppUser = model.AppUser;
    const Conversation = model.Conversation;

    ConversationPart.hasMany(ConversationPartChannelSource, {
        as: 'FkRails67653f9e4ds',
        foreignKey: 'conversation_part_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    ConversationPart.belongsTo(AppUser, {
        as: 'AppUser',
        foreignKey: 'app_user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    ConversationPart.belongsTo(Conversation, {
        as: 'Conversation',
        foreignKey: 'conversation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
