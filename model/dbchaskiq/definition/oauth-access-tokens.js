/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('OauthAccessToken', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        resourceOwnerId: {
            type: DataTypes.BIGINT,
            field: 'resource_owner_id',
            allowNull: true,
            references: {
                model: 'agents',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        applicationId: {
            type: DataTypes.BIGINT,
            field: 'application_id',
            allowNull: true,
            references: {
                model: 'oauth_applications',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        token: {
            type: DataTypes.STRING,
            field: 'token',
            allowNull: false
        },
        refreshToken: {
            type: DataTypes.STRING,
            field: 'refresh_token',
            allowNull: true
        },
        expiresIn: {
            type: DataTypes.INTEGER,
            field: 'expires_in',
            allowNull: true
        },
        revokedAt: {
            type: DataTypes.DATE,
            field: 'revoked_at',
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        scopes: {
            type: DataTypes.STRING,
            field: 'scopes',
            allowNull: true
        },
        previousRefreshToken: {
            type: DataTypes.STRING,
            field: 'previous_refresh_token',
            allowNull: false,
            defaultValue: ""
        }
    }, {
        schema: 'public',
        tableName: 'oauth_access_tokens',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const OauthAccessToken = model.OauthAccessToken;
    const OauthApplication = model.OauthApplication;
    const Agent = model.Agent;

    OauthAccessToken.belongsTo(OauthApplication, {
        as: 'Application',
        foreignKey: 'application_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    OauthAccessToken.belongsTo(Agent, {
        as: 'ResourceOwner',
        foreignKey: 'resource_owner_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
