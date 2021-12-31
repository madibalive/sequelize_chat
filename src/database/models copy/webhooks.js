/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Webhook = sequelize.define(
    'Webhook',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      url: {
        type: DataTypes.STRING,
        field: 'url',
        allowNull: true
      },
      webhookType: {
        type: DataTypes.INTEGER,
        field: 'webhook_type',
        allowNull: true,
        defaultValue: 0
      }
    },
    {
      // schema: 'public',
      tableName: 'webhooks',
      timestamps: true
    }
  );

  Webhook.associate = models => {
    Webhook.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });

    Webhook.belongsTo(models.Inbox, {
      as: 'Inbox',
      foreignKey: 'inbox_id',
      constraint: false
    });
  };

  return Webhook;
};
