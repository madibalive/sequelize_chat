/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('CollectionSection', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            field: 'title',
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING,
            field: 'slug',
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: true
        },
        position: {
            type: DataTypes.INTEGER,
            field: 'position',
            allowNull: true
        },
        articleCollectionId: {
            type: DataTypes.BIGINT,
            field: 'article_collection_id',
            allowNull: false,
            references: {
                model: 'article_collections',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        description: {
            type: DataTypes.TEXT,
            field: 'description',
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
        tableName: 'collection_sections',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const CollectionSection = model.CollectionSection;
    const ArticleCollection = model.ArticleCollection;

    CollectionSection.belongsTo(ArticleCollection, {
        as: 'ArticleCollection',
        foreignKey: 'article_collection_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
