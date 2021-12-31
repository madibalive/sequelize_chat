/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ArInternalMetadatum', {
        key: {
            type: DataTypes.STRING,
            field: 'key',
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: DataTypes.STRING,
            field: 'value',
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
        tableName: 'ar_internal_metadata',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
