/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Visit', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: DataTypes.STRING,
            field: 'url',
            allowNull: true
        },
        appUserId: {
            type: DataTypes.BIGINT,
            field: 'app_user_id',
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            field: 'title',
            allowNull: true
        },
        browserVersion: {
            type: DataTypes.STRING,
            field: 'browser_version',
            allowNull: true
        },
        browserName: {
            type: DataTypes.STRING,
            field: 'browser_name',
            allowNull: true
        },
        os: {
            type: DataTypes.STRING,
            field: 'os',
            allowNull: true
        },
        osVersion: {
            type: DataTypes.STRING,
            field: 'os_version',
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
        tableName: 'visits',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
