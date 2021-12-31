/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define(
    'Account',
    {
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
        allowNull: false
      },

      locale: {
        type: DataTypes.INTEGER,
        field: 'locale',
        allowNull: true,
        defaultValue: 0
      },
      domain: {
        type: DataTypes.STRING(100),
        field: 'domain',
        allowNull: true
      },
      supportEmail: {
        type: DataTypes.STRING(100),
        field: 'support_email',
        allowNull: true
      },
      settingsFlags: {
        type: DataTypes.INTEGER,
        field: 'settings_flags',
        allowNull: false,
        defaultValue: 0
      },
      featureFlags: {
        type: DataTypes.INTEGER,
        field: 'feature_flags',
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      schema: 'public',
      tableName: 'accounts',
      timestamps: false
    }
  );

  Account.associate = model => {
    Account.hasMany(model.AccountUser, {
      // as: 'AccountUser',
      foreignKey: 'account_id'
    });
    Account.hasMany(model.AgentBotInbox, {
      // as: 'AgentBotInbox',
      foreignKey: 'account_id'
    });
    Account.hasMany(model.Inbox, {
      as: 'Inbox',
      foreignKey: 'account_id'
    });

    Account.hasMany(model.Contact, {
      as: 'Contact',
      foreignKey: 'account_id'
    });
    Account.hasMany(model.CannedResponse, {
      as: 'CannedResponse',
      foreignKey: 'account_id'
    });
    Account.hasMany(model.NotificationSetting, {
      as: 'NotificationSetting',
      foreignKey: 'account_id'
    });
    Account.hasMany(model.Label, {
      as: 'Labels',
      foreignKey: 'account_id'
    });
    Account.hasMany(model.Webhook, {
      as: 'Webhook',
      foreignKey: 'account_id'
    });

    Account.belongsToMany(model.User, {
      as: 'TagAccountUser',
      through: model.AccountUser,
      foreignKey: 'account_id',
      otherKey: 'user_id'
    });
  };

  Account.prototype.agents = async function () {
    // await this.setAssignee(agent);
  };

  Account.prototype.administrators = async function () {
    // await this.setAssignee(agent);
  };

  return Account;
};
