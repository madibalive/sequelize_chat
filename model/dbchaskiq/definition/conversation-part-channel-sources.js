/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ConversationPartChannelSource', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        conversationPartId: {
            type: DataTypes.BIGINT,
            field: 'conversation_part_id',
            allowNull: false,
            references: {
                model: 'conversation_parts',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        provider: {
            type: DataTypes.STRING,
            field: 'provider',
            allowNull: true
        },
        messageSourceId: {
            type: DataTypes.STRING,
            field: 'message_source_id',
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
        tableName: 'conversation_part_channel_sources',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ConversationPartChannelSource = model.ConversationPartChannelSource;
    const ConversationPart = model.ConversationPart;

    ConversationPartChannelSource.belongsTo(ConversationPart, {
        as: 'ConversationPart',
        foreignKey: 'conversation_part_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
