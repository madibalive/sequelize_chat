/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Agent', {
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
        email: {
            type: DataTypes.STRING,
            field: 'email',
            allowNull: false,
            defaultValue: ""
        },
        encryptedPassword: {
            type: DataTypes.STRING,
            field: 'encrypted_password',
            allowNull: false,
            defaultValue: ""
        },
        resetPasswordToken: {
            type: DataTypes.STRING,
            field: 'reset_password_token',
            allowNull: true
        },
        resetPasswordSentAt: {
            type: DataTypes.DATE,
            field: 'reset_password_sent_at',
            allowNull: true
        },
        rememberCreatedAt: {
            type: DataTypes.DATE,
            field: 'remember_created_at',
            allowNull: true
        },
        signInCount: {
            type: DataTypes.INTEGER,
            field: 'sign_in_count',
            allowNull: false,
            defaultValue: 0
        },
        currentSignInAt: {
            type: DataTypes.DATE,
            field: 'current_sign_in_at',
            allowNull: true
        },
        lastSignInAt: {
            type: DataTypes.DATE,
            field: 'last_sign_in_at',
            allowNull: true
        },
        currentSignInIp: {
            type: DataTypes.STRING,
            field: 'current_sign_in_ip',
            allowNull: true
        },
        lastSignInIp: {
            type: DataTypes.STRING,
            field: 'last_sign_in_ip',
            allowNull: true
        },
        confirmationToken: {
            type: DataTypes.STRING,
            field: 'confirmation_token',
            allowNull: true
        },
        confirmedAt: {
            type: DataTypes.DATE,
            field: 'confirmed_at',
            allowNull: true
        },
        confirmationSentAt: {
            type: DataTypes.DATE,
            field: 'confirmation_sent_at',
            allowNull: true
        },
        unconfirmedEmail: {
            type: DataTypes.STRING,
            field: 'unconfirmed_email',
            allowNull: true
        },
        failedAttempts: {
            type: DataTypes.INTEGER,
            field: 'failed_attempts',
            allowNull: false,
            defaultValue: 0
        },
        unlockToken: {
            type: DataTypes.STRING,
            field: 'unlock_token',
            allowNull: true
        },
        lockedAt: {
            type: DataTypes.DATE,
            field: 'locked_at',
            allowNull: true
        },
        properties: {
            type: DataTypes.JSONB,
            field: 'properties',
            allowNull: false,
            defaultValue: "{}"
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
        invitationToken: {
            type: DataTypes.STRING,
            field: 'invitation_token',
            allowNull: true
        },
        invitationCreatedAt: {
            type: DataTypes.DATE,
            field: 'invitation_created_at',
            allowNull: true
        },
        invitationSentAt: {
            type: DataTypes.DATE,
            field: 'invitation_sent_at',
            allowNull: true
        },
        invitationAcceptedAt: {
            type: DataTypes.DATE,
            field: 'invitation_accepted_at',
            allowNull: true
        },
        invitationLimit: {
            type: DataTypes.INTEGER,
            field: 'invitation_limit',
            allowNull: true
        },
        invitedByType: {
            type: DataTypes.STRING,
            field: 'invited_by_type',
            allowNull: true
        },
        invitedById: {
            type: DataTypes.BIGINT,
            field: 'invited_by_id',
            allowNull: true
        },
        invitationsCount: {
            type: DataTypes.INTEGER,
            field: 'invitations_count',
            allowNull: true,
            defaultValue: 0
        },
        bot: {
            type: DataTypes.BOOLEAN,
            field: 'bot',
            allowNull: true
        },
        available: {
            type: DataTypes.BOOLEAN,
            field: 'available',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'agents',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Agent = model.Agent;
    const OauthAccessGrant = model.OauthAccessGrant;
    const OauthAccessToken = model.OauthAccessToken;
    const Role = model.Role;
    const OauthApplication = model.OauthApplication;
    const App = model.App;

    Agent.hasMany(OauthAccessGrant, {
        as: 'FkRails330c32d8d9s',
        foreignKey: 'resource_owner_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Agent.hasMany(OauthAccessToken, {
        as: 'FkRailsEe63f25419s',
        foreignKey: 'resource_owner_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Agent.hasMany(Role, {
        as: 'FkRailsE2cb86721cs',
        foreignKey: 'agent_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Agent.belongsToMany(OauthApplication, {
        as: 'OauthAccessGrantApplications',
        through: OauthAccessGrant,
        foreignKey: 'resource_owner_id',
        otherKey: 'application_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Agent.belongsToMany(OauthApplication, {
        as: 'OauthAccessTokenApplications',
        through: OauthAccessToken,
        foreignKey: 'resource_owner_id',
        otherKey: 'application_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Agent.belongsToMany(App, {
        as: 'RoleApps',
        through: Role,
        foreignKey: 'agent_id',
        otherKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
