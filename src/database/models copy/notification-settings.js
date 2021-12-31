/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const NotificationSetting = sequelize.define(
    'NotificationSetting',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      emailFlags: {
        type: DataTypes.INTEGER,
        field: 'email_flags',
        allowNull: false,
        defaultValue: 0
      },

      pushFlags: {
        type: DataTypes.INTEGER,
        field: 'push_flags',
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      schema: 'public',
      tableName: 'notification_settings',
      timestamps: false
    }
  );

  NotificationSetting.associate = models => {
    NotificationSetting.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });

    NotificationSetting.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });
  };

  return NotificationSetting;
};

module.exports.initRelations = () => {
  delete module.exports.initRelations; // Destroy itself to prevent repeated calls.
};
