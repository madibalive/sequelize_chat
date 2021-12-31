/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ActiveStorageAttachment', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false
        },
        recordType: {
            type: DataTypes.STRING,
            field: 'record_type',
            allowNull: false
        },
        recordId: {
            type: DataTypes.BIGINT,
            field: 'record_id',
            allowNull: false
        },
        blobId: {
            type: DataTypes.BIGINT,
            field: 'blob_id',
            allowNull: false,
            references: {
                model: 'active_storage_blobs',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: false
        }
    }, {
        schema: 'public',
        tableName: 'active_storage_attachments',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ActiveStorageAttachment = model.ActiveStorageAttachment;
    const ActiveStorageBlob = model.ActiveStorageBlob;

    ActiveStorageAttachment.belongsTo(ActiveStorageBlob, {
        as: 'Blob',
        foreignKey: 'blob_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
