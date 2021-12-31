/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AppTranslation', {
        id: {
            type: DataTypes.BIGINT,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        appId: {
            type: DataTypes.BIGINT,
            field: 'app_id',
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
        greetings: {
            type: DataTypes.TEXT,
            field: 'greetings',
            allowNull: true
        },
        intro: {
            type: DataTypes.TEXT,
            field: 'intro',
            allowNull: true
        },
        tagline: {
            type: DataTypes.TEXT,
            field: 'tagline',
            allowNull: true
        }
    }, {
        schema: 'public',
        tableName: 'app_translations',
        timestamps: false
    });
};

module.exports.initRelations = () => {
    delete module.exports.initRelations; // Destroy itself to prevent repeated calls.

};
