/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('QuickReplyTranslation', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quickReplyId: {
            type: DataTypes.BIGINT,
            field: 'quick_reply_id',
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
        content: {
            type: DataTypes.TEXT,
            field: 'content',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'quick_reply_translations',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
