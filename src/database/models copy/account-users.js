/* eslint new-cap: "off", global-require: "off" */

const { ROLE } = require('../../utils/global');

module.exports = (sequelize, DataTypes) => {
  const AccountUser = sequelize.define(
    'AccountUser',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      role: {
        type: DataTypes.INTEGER,
        field: 'role',
        allowNull: true,
        defaultValue: 0
      },

      activeAt: {
        type: DataTypes.DATE,
        field: 'active_at',
        allowNull: true
      },
      administrator: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        get() {
          return this.getDataValue(role) === ROLE['administrator'];
        }
      }
    },
    {
      schema: 'public',
      tableName: 'account_users',
      timestamps: true
    }
  );

  AccountUser.associate = model => {
    const AccountUser = model.AccountUser;
    const User = model.User;
    const Account = model.Account;

    AccountUser.belongsTo(User, {
      as: 'User',
      foreignKey: 'user_id'
    });
    AccountUser.belongsTo(User, {
      as: 'Inviter',
      foreignKey: 'inviter_id',
      constraint: false
    });

    AccountUser.belongsTo(Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });
  };

  const notify_creation = async function (instance, options) {
    // Rails.configuration.dispatcher.dispatch(AGENT_ADDED, Time.zone.now, account: account)
  };

  const create_notification_setting = async function (instance, options) {
    let user = await instance.getUser();
    user.createNotificationSettings({
      selected_email_flags: sample,
      selected_push_flags: sample
    });
  };

  AccountUser.afterCreate(create_notification_setting);
  AccountUser.afterCreate(notify_creation);

  return AccountUser;
};
