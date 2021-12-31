/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Segment', {
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
        appId: {
            type: DataTypes.BIGINT,
            field: 'app_id',
            allowNull: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: true
        },
        properties: {
            type: DataTypes.JSONB,
            field: 'properties',
            allowNull: true,
            defaultValue: "\"{}\""
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
        tableName: 'segments',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
