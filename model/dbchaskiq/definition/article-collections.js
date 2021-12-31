/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ArticleCollection', {
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
        properties: {
            type: DataTypes.JSONB,
            field: 'properties',
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
        description: {
            type: DataTypes.TEXT,
            field: 'description',
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
            allowNull: false,
            references: {
                model: 'apps',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
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
        tableName: 'article_collections',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const ArticleCollection = model.ArticleCollection;
    const CollectionSection = model.CollectionSection;
    const App = model.App;

    ArticleCollection.hasMany(CollectionSection, {
        as: 'FkRails789989bad7s',
        foreignKey: 'article_collection_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

    ArticleCollection.belongsTo(App, {
        as: 'App',
        foreignKey: 'app_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
