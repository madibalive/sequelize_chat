/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ArticleContent', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        htmlContent: {
            type: DataTypes.TEXT,
            field: 'html_content',
            allowNull: true
        },
        serializedContent: {
            type: DataTypes.TEXT,
            field: 'serialized_content',
            allowNull: true
        },
        textContent: {
            type: DataTypes.TEXT,
            field: 'text_content',
            allowNull: true
        },
        articleId: {
            type: DataTypes.BIGINT,
            field: 'article_id',
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
        }
    }, {
        schema: 'public',
        tableName: 'article_contents',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
