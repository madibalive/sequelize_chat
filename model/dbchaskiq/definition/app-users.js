/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AppUser', {
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
        properties: {
            type: DataTypes.JSONB,
            field: 'properties',
            allowNull: true,
            defaultValue: "{}"
        },
        lastVisitedAt: {
            type: DataTypes.DATE,
            field: 'last_visited_at',
            allowNull: true
        },
        referrer: {
            type: DataTypes.STRING,
            field: 'referrer',
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: true
        },
        ip: {
            type: DataTypes.STRING,
            field: 'ip',
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            field: 'city',
            allowNull: true
        },
        region: {
            type: DataTypes.STRING,
            field: 'region',
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            field: 'country',
            allowNull: true
        },
        subscriptionState: {
            type: DataTypes.STRING,
            field: 'subscription_state',
            allowNull: true
        },
        sessionId: {
            type: DataTypes.STRING,
            field: 'session_id',
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            field: 'email',
            allowNull: true
        },
        lat: {
            type: DataTypes.DECIMAL(15, 10),
            field: 'lat',
            allowNull: true
        },
        lng: {
            type: DataTypes.DECIMAL(15, 10),
            field: 'lng',
            allowNull: true
        },
        postal: {
            type: DataTypes.STRING,
            field: 'postal',
            allowNull: true
        },
        webSessions: {
            type: DataTypes.INTEGER,
            field: 'web_sessions',
            allowNull: true
        },
        timezone: {
            type: DataTypes.STRING,
            field: 'timezone',
            allowNull: true
        },
        browser: {
            type: DataTypes.STRING,
            field: 'browser',
            allowNull: true
        },
        browserVersion: {
            type: DataTypes.STRING,
            field: 'browser_version',
            allowNull: true
        },
        os: {
            type: DataTypes.STRING,
            field: 'os',
            allowNull: true
        },
        osVersion: {
            type: DataTypes.STRING,
            field: 'os_version',
            allowNull: true
        },
        browserLanguage: {
            type: DataTypes.STRING,
            field: 'browser_language',
            allowNull: true
        },
        lang: {
            type: DataTypes.STRING,
            field: 'lang',
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
        type: {
            type: DataTypes.STRING,
            field: 'type',
            allowNull: true
        },
        lastSeen: {
            type: DataTypes.DATE,
            field: 'last_seen',
            allowNull: true
        },
        firstSeen: {
            type: DataTypes.DATE,
            field: 'first_seen',
            allowNull: true
        },
        signedUp: {
            type: DataTypes.DATE,
            field: 'signed_up',
            allowNull: true
        },
        lastContacted: {
            type: DataTypes.DATE,
            field: 'last_contacted',
            allowNull: true
        },
        lastHeardFrom: {
            type: DataTypes.DATE,
            field: 'last_heard_from',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'app_users',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const AppUser = model.AppUser;
    const ConversationPart = model.ConversationPart;
    const ExternalProfile = model.ExternalProfile;
    const Metric = model.Metric;
    const App = model.App;
    const Conversation = model.Conversation;

    AppUser.hasMany(ConversationPart, {
        as: 'FkRails6a76ee31a7s',
        foreignKey: 'app_user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    AppUser.hasMany(ExternalProfile, {
        as: 'FkRailsC3a8b570e6s',
        foreignKey: 'app_user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    AppUser.hasMany(Metric, {
        as: 'FkRailsF9806df323s',
        foreignKey: 'app_user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    AppUser.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    AppUser.belongsToMany(Conversation, {
        as: 'ConversationPartConversations',
        through: ConversationPart,
        foreignKey: 'app_user_id',
        otherKey: 'conversation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
