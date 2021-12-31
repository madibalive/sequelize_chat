/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('SchemaMigration', {
        version: {
            type: DataTypes.STRING,
            field: 'version',
            allowNull: false,
            primaryKey: true
        }
    }, {
        schema: 'public',
        tableName: 'schema_migrations',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
