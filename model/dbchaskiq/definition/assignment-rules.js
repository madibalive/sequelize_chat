/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AssignmentRule', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
        agentId: {
            type: DataTypes.BIGINT,
            field: 'agent_id',
            allowNull: false
        },
        conditions: {
            type: DataTypes.JSONB,
            field: 'conditions',
            allowNull: true
        },
        priority: {
            type: DataTypes.INTEGER,
            field: 'priority',
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            field: 'title',
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
        tableName: 'assignment_rules',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const AssignmentRule = model.AssignmentRule;
    const App = model.App;

    AssignmentRule.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
