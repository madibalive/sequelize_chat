/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PreviewCard', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        statusId: {
            type: DataTypes.INTEGER,
            field: 'status_id',
            allowNull: true
        },
        url: {
            type: DataTypes.STRING,
            field: 'url',
            allowNull: false,
            defaultValue: ""
        },
        title: {
            type: DataTypes.STRING,
            field: 'title',
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            field: 'description',
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            field: 'image',
            allowNull: true
        },
        imageFileSize: {
            type: DataTypes.INTEGER,
            field: 'image_file_size',
            allowNull: true
        },
        imageFileName: {
            type: DataTypes.STRING,
            field: 'image_file_name',
            allowNull: true
        },
        imageFileType: {
            type: DataTypes.STRING,
            field: 'image_file_type',
            allowNull: true
        },
        imageUpdatedAt: {
            type: DataTypes.DATE,
            field: 'image_updated_at',
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            field: 'type',
            allowNull: true
        },
        html: {
            type: DataTypes.TEXT,
            field: 'html',
            allowNull: true
        },
        authorName: {
            type: DataTypes.STRING,
            field: 'author_name',
            allowNull: true
        },
        authorUrl: {
            type: DataTypes.STRING,
            field: 'author_url',
            allowNull: true
        },
        providerName: {
            type: DataTypes.STRING,
            field: 'provider_name',
            allowNull: true
        },
        providerUrl: {
            type: DataTypes.STRING,
            field: 'provider_url',
            allowNull: true
        },
        width: {
            type: DataTypes.INTEGER,
            field: 'width',
            allowNull: true
        },
        height: {
            type: DataTypes.INTEGER,
            field: 'height',
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
        tableName: 'preview_cards',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
