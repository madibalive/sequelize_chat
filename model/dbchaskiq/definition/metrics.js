/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Metric', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        campaignId: {
            type: DataTypes.BIGINT,
            field: 'campaign_id',
            allowNull: true
        },
        trackableType: {
            type: DataTypes.STRING,
            field: 'trackable_type',
            allowNull: false
        },
        trackableId: {
            type: DataTypes.BIGINT,
            field: 'trackable_id',
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            field: 'action',
            allowNull: true
        },
        host: {
            type: DataTypes.STRING,
            field: 'host',
            allowNull: true
        },
        data: {
            type: DataTypes.JSONB,
            field: 'data',
            allowNull: true,
            defaultValue: "{}"
        },
        messageId: {
            type: DataTypes.STRING,
            field: 'message_id',
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
        }
    }, {
        schema: 'public',
        tableName: 'metrics',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Metric = model.Metric;
    const AppUser = model.AppUser;

    Metric.belongsTo(AppUser, {
        as: 'AppUser',
        foreignKey: 'app_user_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
