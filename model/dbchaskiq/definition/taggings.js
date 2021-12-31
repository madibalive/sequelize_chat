/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tagging', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        tagId: {
            type: DataTypes.INTEGER,
            field: 'tag_id',
            allowNull: true,
            references: {
                model: 'tags',
                key: 'id'
            },
            onUpdate: 'NO ACTION',
            onDelete: 'NO ACTION'
        },
        taggableType: {
            type: DataTypes.STRING,
            field: 'taggable_type',
            allowNull: true
        },
        taggableId: {
            type: DataTypes.INTEGER,
            field: 'taggable_id',
            allowNull: true
        },
        taggerType: {
            type: DataTypes.STRING,
            field: 'tagger_type',
            allowNull: true
        },
        taggerId: {
            type: DataTypes.INTEGER,
            field: 'tagger_id',
            allowNull: true
        },
        context: {
            type: DataTypes.STRING(128),
            field: 'context',
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'taggings',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Tagging = model.Tagging;
    const Tag = model.Tag;

    Tagging.belongsTo(Tag, {
        as: 'Tag',
        foreignKey: 'tag_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
