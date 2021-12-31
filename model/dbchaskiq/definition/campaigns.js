/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Campaign', {
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
        fromName: {
            type: DataTypes.STRING,
            field: 'from_name',
            allowNull: true
        },
        fromEmail: {
            type: DataTypes.STRING,
            field: 'from_email',
            allowNull: true
        },
        replyEmail: {
            type: DataTypes.STRING,
            field: 'reply_email',
            allowNull: true
        },
        htmlContent: {
            type: DataTypes.TEXT,
            field: 'html_content',
            allowNull: true
        },
        premailer: {
            type: DataTypes.TEXT,
            field: 'premailer',
            allowNull: true
        },
        serializedContent: {
            type: DataTypes.TEXT,
            field: 'serialized_content',
            allowNull: true
        },
        description: {
            type: DataTypes.STRING,
            field: 'description',
            allowNull: true
        },
        sent: {
            type: DataTypes.BOOLEAN,
            field: 'sent',
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: true
        },
        scheduledAt: {
            type: DataTypes.DATE,
            field: 'scheduled_at',
            allowNull: true
        },
        timezone: {
            type: DataTypes.STRING,
            field: 'timezone',
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: true
        },
        subject: {
            type: DataTypes.STRING,
            field: 'subject',
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
        segments: {
            type: DataTypes.JSONB,
            field: 'segments',
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            field: 'type',
            allowNull: true,
            defaultValue: "Campaign"
        },
        settings: {
            type: DataTypes.JSONB,
            field: 'settings',
            allowNull: true,
            defaultValue: "{}"
        },
        scheduledTo: {
            type: DataTypes.DATE,
            field: 'scheduled_to',
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
        tableName: 'campaigns',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Campaign = model.Campaign;
    const App = model.App;

    Campaign.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
