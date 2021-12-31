/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ArticleSettingTranslation', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        articleSettingId: {
            type: DataTypes.BIGINT,
            field: 'article_setting_id',
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
        siteTitle: {
            type: DataTypes.STRING,
            field: 'site_title',
            allowNull: true
        },
        siteDescription: {
            type: DataTypes.TEXT,
            field: 'site_description',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'article_setting_translations',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
