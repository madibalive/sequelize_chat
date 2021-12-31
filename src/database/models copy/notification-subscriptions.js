/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const NotificationSubscription = sequelize.define(
    'NotificationSubscription',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      subscriptionType: {
        type: DataTypes.INTEGER,
        field: 'subscription_type',
        allowNull: false
      },
      subscriptionAttributes: {
        type: DataTypes.JSONB,
        field: 'subscription_attributes',
        allowNull: false,
        defaultValue: '"{}"'
      },

      identifier: {
        type: DataTypes.STRING,
        field: 'identifier',
        allowNull: true
      }
    },
    {
      schema: 'public',
      tableName: 'notification_subscriptions',
      timestamps: true
    }
  );

  NotificationSubscription.associate = models => {
    NotificationSubscription.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });
  };

  return NotificationSubscription;
};
