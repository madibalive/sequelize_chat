/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Conversation', {
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
        appId: {
            type: DataTypes.BIGINT,
            field: 'app_id',
            allowNull: true,
            references: {
                model: 'apps',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        assigneeId: {
            type: DataTypes.BIGINT,
            field: 'assignee_id',
            allowNull: true
        },
        admins: {
            type: DataTypes.JSONB,
            field: 'admins',
            allowNull: true
        },
        replyCount: {
            type: DataTypes.INTEGER,
            field: 'reply_count',
            allowNull: true
        },
        partsCount: {
            type: DataTypes.INTEGER,
            field: 'parts_count',
            allowNull: true
        },
        latestAdminVisibleCommentAt: {
            type: DataTypes.DATE,
            field: 'latest_admin_visible_comment_at',
            allowNull: true
        },
        latestUpdateAt: {
            type: DataTypes.DATE,
            field: 'latest_update_at',
            allowNull: true
        },
        latestUserVisibleCommentAt: {
            type: DataTypes.DATE,
            field: 'latest_user_visible_comment_at',
            allowNull: true
        },
        readAt: {
            type: DataTypes.DATE,
            field: 'read_at',
            allowNull: true
        },
        mainParticipantId: {
            type: DataTypes.BIGINT,
            field: 'main_participant_id',
            allowNull: true
        },
        priority: {
            type: DataTypes.BOOLEAN,
            field: 'priority',
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
        firstAgentReply: {
            type: DataTypes.DATE,
            field: 'first_agent_reply',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'conversations',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Conversation = model.Conversation;
    const ConversationChannel = model.ConversationChannel;
    const ConversationPart = model.ConversationPart;
    const ConversationSource = model.ConversationSource;
    const App = model.App;
    const AppUser = model.AppUser;
    const AppPackageIntegration = model.AppPackageIntegration;

    Conversation.hasMany(ConversationChannel, {
        as: 'FkRails118220737ds',
        foreignKey: 'conversation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Conversation.hasMany(ConversationPart, {
        as: 'FkRails90c1b51308s',
        foreignKey: 'conversation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Conversation.hasMany(ConversationSource, {
        as: 'FkRails46bc64cb62s',
        foreignKey: 'conversation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Conversation.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Conversation.belongsToMany(AppUser, {
        as: 'ConversationPartAppUsers',
        through: ConversationPart,
        foreignKey: 'conversation_id',
        otherKey: 'app_user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Conversation.belongsToMany(AppPackageIntegration, {
        as: 'ConversationSourceAppPackageIntegrations',
        through: ConversationSource,
        foreignKey: 'conversation_id',
        otherKey: 'app_package_integration_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
