/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Article', {
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
        state: {
            type: DataTypes.STRING,
            field: 'state',
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING,
            field: 'slug',
            allowNull: true
        },
        publishedAt: {
            type: DataTypes.STRING,
            field: 'published_at',
            allowNull: true
        },
        position: {
            type: DataTypes.INTEGER,
            field: 'position',
            allowNull: true
        },
        appId: {
            type: DataTypes.BIGINT,
            field: 'app_id',
            allowNull: false
        },
        authorId: {
            type: DataTypes.BIGINT,
            field: 'author_id',
            allowNull: false
        },
        articleCollectionId: {
            type: DataTypes.BIGINT,
            field: 'article_collection_id',
            allowNull: true
        },
        articleSectionId: {
            type: DataTypes.BIGINT,
            field: 'article_section_id',
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
        tableName: 'articles',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
