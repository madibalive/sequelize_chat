/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      provider: {
        type: DataTypes.STRING,
        field: 'provider',
        allowNull: false,
        defaultValue: 'email'
      },
      uid: {
        type: DataTypes.STRING,
        field: 'uid',
        allowNull: false,
        defaultValue: ''
      },
      signInCount: {
        type: DataTypes.INTEGER,
        field: 'sign_in_count',
        allowNull: false,
        defaultValue: 0
      },
      currentSignInAt: {
        type: DataTypes.DATE,
        field: 'current_sign_in_at',
        allowNull: true
      },
      lastSignInAt: {
        type: DataTypes.DATE,
        field: 'last_sign_in_at',
        allowNull: true
      },
      currentSignInIp: {
        type: DataTypes.STRING,
        field: 'current_sign_in_ip',
        allowNull: true
      },
      lastSignInIp: {
        type: DataTypes.STRING,
        field: 'last_sign_in_ip',
        allowNull: true
      },
      confirmationToken: {
        type: DataTypes.STRING,
        field: 'confirmation_token',
        allowNull: true
      },
      confirmedAt: {
        type: DataTypes.DATE,
        field: 'confirmed_at',
        allowNull: true
      },
      unconfirmedEmail: {
        type: DataTypes.STRING,
        field: 'unconfirmed_email',
        allowNull: true
      },
      oauthid: {
        type: DataTypes.STRING,
        field: 'oauthid'
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        get() {
          return this.getDataValue("firstName") + ' ' + this.getDataValue("lastName");
        }
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: false
      },
      displayName: {
        type: DataTypes.STRING,
        field: 'display_name',
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        unique: true,
        allowNull: true
      },
      tokens: {
        type: DataTypes.JSON,
        field: 'tokens',
        allowNull: true
      },
      pubsubToken: {
        type: DataTypes.STRING,
        field: 'pubsub_token',
        allowNull: true
      },
      availability: {
        type: DataTypes.INTEGER,
        field: 'availability',
        allowNull: true,
        defaultValue: 0
      }
    },
    {
      schema: 'public',
      tableName: 'users',
      timestamps: false
    }
  );

  User.associate = models => {
    User.hasMany(models.AccountUser, {
      // as: 'AccountUser',
      foreignKey: 'account_user_id'
    });

    User.hasMany(models.Conversation, {
      as: 'AssignedConversation',
      foreignKey: 'assignee_id'
    });

    User.belongsToMany(models.Account, {
      as: 'AccountUserAccounts',
      through: models.AccountUser,
      foreignKey: 'user_id',
      otherKey: 'account_id'
    });

    User.hasMany(models.InboxMember, {
      // as: 'InboxMember',
      foreignKey: 'user_id'
    });

    User.belongsToMany(models.Inbox, {
      as: 'TagUserInbox',
      through: models.InboxMember,
      foreignKey: 'user_id',
      otherKey: 'inbox_id'
    });

    User.hasMany(models.Message, {
      as: 'Message',
      foreignKey: 'sender_id'
    });

    User.hasMany(models.NotificationSubscription, {
      as: 'NotificationSubscription',
      foreignKey: 'user_id'
    });
    User.hasMany(models.Notification, {
      as: 'Notification',
      foreignKey: 'user_id'
    });
    User.hasMany(models.NotificationSetting, {
      as: 'NotificationSetting',
      foreignKey: 'user_id'
    });
  };

  User.prototype.administrator = async function () {
    let accountUser = await this.getAccountUser({});
    return accountUser.administrator;
  };

  User.prototype.agent = async function () {
    let accountUser = await this.getAccountUser({});
    return !accountUser.administrator;
  };

  User.prototype.push_event_data = function () {
    // let inbox =await this.getTagInbox();
    return {
      id: this.id,
      name: this.name,
      avatar_url: this.avatar_url,
      type: 'user'
    };
  };

  User.prototype.webhook_data = function () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      type: 'user'
    };
  };

  const notify_conversation_creation = async function (instance, options) {
    //   accounts.each do |account|
    //   OnlineStatusTracker.set_status(account.id, id, availability)
    // end
  };

  // User.afterCreate(create_access_token);
  User.afterSave(notify_conversation_creation);
  return User;
};
