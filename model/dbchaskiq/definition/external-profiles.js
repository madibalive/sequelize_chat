/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ExternalProfile', {
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
        appUserId: {
            type: DataTypes.BIGINT,
            field: 'app_user_id',
            allowNull: false,
            references: {
                model: 'app_users',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        data: {
            type: DataTypes.JSONB,
            field: 'data',
            allowNull: true
        },
        profileId: {
            type: DataTypes.STRING,
            field: 'profile_id',
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
        tableName: 'external_profiles',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ExternalProfile = model.ExternalProfile;
    const AppUser = model.AppUser;

    ExternalProfile.belongsTo(AppUser, {
        as: 'AppUser',
        foreignKey: 'app_user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
