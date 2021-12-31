/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BotTask', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            field: 'title',
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: true
        },
        predicates: {
            type: DataTypes.JSONB,
            field: 'predicates',
            allowNull: true
        },
        appId: {
            type: DataTypes.BIGINT,
            field: 'app_id',
            allowNull: false,
            references: {
                model: 'apps',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        settings: {
            type: DataTypes.JSONB,
            field: 'settings',
            allowNull: true
        },
        paths: {
            type: DataTypes.JSON,
            field: 'paths',
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
        position: {
            type: DataTypes.INTEGER,
            field: 'position',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'bot_tasks',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const BotTask = model.BotTask;
    const App = model.App;

    BotTask.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
