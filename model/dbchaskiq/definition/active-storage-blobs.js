/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ActiveStorageBlob', {
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
            allowNull: false
        },
        filename: {
            type: DataTypes.STRING,
            field: 'filename',
            allowNull: false
        },
        contentType: {
            type: DataTypes.STRING,
            field: 'content_type',
            allowNull: true
        },
        metadata: {
            type: DataTypes.TEXT,
            field: 'metadata',
            allowNull: true
        },
        byteSize: {
            type: DataTypes.BIGINT,
            field: 'byte_size',
            allowNull: false
        },
        checksum: {
            type: DataTypes.STRING,
            field: 'checksum',
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'active_storage_blobs',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ActiveStorageBlob = model.ActiveStorageBlob;
    const ActiveStorageAttachment = model.ActiveStorageAttachment;

    ActiveStorageBlob.hasMany(ActiveStorageAttachment, {
        as: 'FkRailsC3b3935057s',
        foreignKey: 'blob_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
