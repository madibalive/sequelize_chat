/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const EmailTemplate = sequelize.define(
    'EmailTemplate',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        field: 'body',
        allowNull: false
      },
      accountId: {
        type: DataTypes.INTEGER,
        field: 'account_id',
        allowNull: true
      },
      templateType: {
        type: DataTypes.INTEGER,
        field: 'template_type',
        allowNull: true,
        defaultValue: 1
      },
      locale: {
        type: DataTypes.INTEGER,
        field: 'locale',
        allowNull: false,
        defaultValue: 0
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
    },
    {
      schema: 'public',
      tableName: 'email_templates',
      timestamps: false
    }
  );

  EmailTemplate.associate = models => {};

  return EmailTemplate;
};
