/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ArticleCollectionTranslation', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        articleCollectionId: {
            type: DataTypes.BIGINT,
            field: 'article_collection_id',
            allowNull: false
        },
        locale: {
            type: DataTypes.STRING,
            field: 'locale',
            allowNull: false
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
        }
    }, {
        schema: 'public',
        tableName: 'article_collection_translations',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
