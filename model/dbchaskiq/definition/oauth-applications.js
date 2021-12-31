/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('OauthApplication', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false
        },
        uid: {
            type: DataTypes.STRING,
            field: 'uid',
            allowNull: false
        },
        secret: {
            type: DataTypes.STRING,
            field: 'secret',
            allowNull: false
        },
        redirectUri: {
            type: DataTypes.STRING,
            field: 'redirect_uri',
            allowNull: true
        },
        scopes: {
            type: DataTypes.STRING,
            field: 'scopes',
            allowNull: false,
            defaultValue: ""
        },
        confidential: {
            type: DataTypes.BOOLEAN,
            field: 'confidential',
            allowNull: false,
            defaultValue: true
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
        },
        ownerType: {
            type: DataTypes.STRING,
            field: 'owner_type',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'oauth_applications',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const OauthApplication = model.OauthApplication;
    const OauthAccessGrant = model.OauthAccessGrant;
    const OauthAccessToken = model.OauthAccessToken;
    const Agent = model.Agent;

    OauthApplication.hasMany(OauthAccessGrant, {
        as: 'FkRailsB4b53e07b8s',
        foreignKey: 'application_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    OauthApplication.hasMany(OauthAccessToken, {
        as: 'FkRails732cb83ab7s',
        foreignKey: 'application_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    OauthApplication.belongsToMany(Agent, {
        as: 'OauthAccessGrantResourceOwners',
        through: OauthAccessGrant,
        foreignKey: 'application_id',
        otherKey: 'resource_owner_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    OauthApplication.belongsToMany(Agent, {
        as: 'OauthAccessTokenResourceOwners',
        through: OauthAccessToken,
        foreignKey: 'application_id',
        otherKey: 'resource_owner_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
