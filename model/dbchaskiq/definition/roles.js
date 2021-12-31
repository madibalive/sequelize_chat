/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
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
            allowNull: true,
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
            allowNull: true,
            references: {
                model: 'agents',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        role: {
            type: DataTypes.STRING,
            field: 'role',
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
        tableName: 'roles',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Role = model.Role;
    const App = model.App;
    const Agent = model.Agent;

    Role.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    Role.belongsTo(Agent, {
        as: 'Agent',
        foreignKey: 'agent_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
