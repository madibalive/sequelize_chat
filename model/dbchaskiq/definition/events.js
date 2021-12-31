/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Event', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        eventableType: {
            type: DataTypes.STRING,
            field: 'eventable_type',
            allowNull: false
        },
        eventableId: {
            type: DataTypes.BIGINT,
            field: 'eventable_id',
            allowNull: false
        },
        action: {
            type: DataTypes.STRING,
            field: 'action',
            allowNull: true
        },
        properties: {
            type: DataTypes.JSONB,
            field: 'properties',
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
        tableName: 'events',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
