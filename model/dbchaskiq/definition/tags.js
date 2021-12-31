/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tag', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
            allowNull: true
        },
        taggingsCount: {
            type: DataTypes.INTEGER,
            field: 'taggings_count',
            allowNull: true,
            defaultValue: 0
        }
    }, {
        schema: 'public',
        tableName: 'tags',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

    const model = require('../index');
    const Tag = model.Tag;
    const Tagging = model.Tagging;

    Tag.hasMany(Tagging, {
        as: 'FkRails9fcd2e236bs',
        foreignKey: 'tag_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    });

};
