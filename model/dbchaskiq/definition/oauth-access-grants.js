/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('OauthAccessGrant', {
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
            allowNull: false,
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
        expiresIn: {
            type: DataTypes.INTEGER,
            field: 'expires_in',
            allowNull: false
        },
        redirectUri: {
            type: DataTypes.TEXT,
            field: 'redirect_uri',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        },
        revokedAt: {
            type: DataTypes.DATE,
            field: 'revoked_at',
            allowNull: true
        },
        scopes: {
            type: DataTypes.STRING,
            field: 'scopes',
            allowNull: false,
            defaultValue: ""
        }
    }, {
        schema: 'public',
        tableName: 'oauth_access_grants',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const OauthAccessGrant = model.OauthAccessGrant;
    const Agent = model.Agent;
    const OauthApplication = model.OauthApplication;

    OauthAccessGrant.belongsTo(Agent, {
        as: 'ResourceOwner',
        foreignKey: 'resource_owner_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    OauthAccessGrant.belongsTo(OauthApplication, {
        as: 'Application',
        foreignKey: 'application_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
