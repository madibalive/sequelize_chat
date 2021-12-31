/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const IntegrationsHook = sequelize.define(
    'IntegrationsHook',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      status: {
        type: DataTypes.INTEGER,
        field: 'status',
        allowNull: true,
        defaultValue: 0
      },
      inboxId: {
        type: DataTypes.INTEGER,
        field: 'inbox_id',
        allowNull: true
      },
      accountId: {
        type: DataTypes.INTEGER,
        field: 'account_id',
        allowNull: true
      },
      appId: {
        type: DataTypes.STRING,
        field: 'app_id',
        allowNull: true
      },
      settings: {
        type: DataTypes.TEXT,
        field: 'settings',
        allowNull: true
      },
      hookType: {
        type: DataTypes.INTEGER,
        field: 'hook_type',
        allowNull: true,
        defaultValue: 0
      },
      referenceId: {
        type: DataTypes.STRING,
        field: 'reference_id',
        allowNull: true
      },
      accessToken: {
        type: DataTypes.STRING,
        field: 'access_token',
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
    },
    {
      schema: 'public',
      tableName: 'integrations_hooks',
      timestamps: false
    }
  );

  IntegrationsHook.associate = models => {};

  return IntegrationsHook;
};
