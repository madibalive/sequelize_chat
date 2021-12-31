/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Inbox = sequelize.define(
    'Inbox',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      channelId: {
        type: DataTypes.INTEGER,
        field: 'channel_id',
        allowNull: false
      },

      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false
      },
      avatar_url: {
        type: DataTypes.STRING,
        field: 'avatar_url',
        allowNull: true
      },
      channelType: {
        type: DataTypes.STRING,
        field: 'channel_type',
        allowNull: true
      },
      enableAutoAssignment: {
        type: DataTypes.BOOLEAN,
        field: 'enable_auto_assignment',
        allowNull: true,
        defaultValue: true
      },
      greetingEnabled: {
        type: DataTypes.BOOLEAN,
        field: 'greeting_enabled',
        allowNull: true,
        defaultValue: false
      },
      greetingMessage: {
        type: DataTypes.STRING,
        field: 'greeting_message',
        allowNull: true
      }
    },
    {
      // schema: 'public',
      tableName: 'inboxes',
      timestamps: true
    }
  );

  Inbox.associate = models => {
    // Inbox.belongsToMany(models.Contact, {
    //   as: 'Contact',
    //   through: models.ContactInbox,
    //   foreignKey: 'inbox_id',
    //   otherKey: 'contact_id'
    // });

    // Inbox.belongsToMany(models.User, {
    //   as: 'TagMembers',
    //   through: models.InboxMember,
    //   foreignKey: 'inbox_id',
    //   otherKey: 'user_id'
    // });

    // Inbox.belongsToMany(models.AgentBot, {
    //   as: 'TagBot',
    //   through: models.AgentBotInbox,
    //   foreignKey: 'inbox_id',
    //   otherKey: 'agent_id'
    // });

    // Inbox.belongsToMany(models.Message, {
    //   as: 'TagMessage',
    //   through: models.Message,
    //   foreignKey: 'inbox_id',
    //   otherKey: 'message_id'
    // });

    // Inbox.hasMany(models.InboxMember, {
    //   // as: 'InboxMember',
    //   foreignKey: 'inbox_id'
    // });

    // Inbox.belongsTo(models.Account, {
    //   as: 'Account',
    //   foreignKey: 'account_id'
    // });

    // Inbox.hasMany(models.Webhook, {
    //   as: 'Webhook',
    //   foreignKey: 'inbox_id'
    // });

    // Inbox.hasMany(models.ContactInbox, {
    //   // as: 'ContactInbox',
    //   foreignKey: 'inbox_id'
    // });

    // Inbox.hasMany(models.AgentBotInbox, {
    //   // as: 'AgentBotInbox',
    //   foreignKey: 'inbox_id'
    // });

    // Inbox.hasMany(models.Conversation, {
    //   as: 'Conversation',
    //   foreignKey: 'conversation_id'
    // });

    Inbox.addScope(
      'order_by',
      (direction = desc => ({
        order: direction
      }))
    );
  };

  Inbox.prototype.add_member = async function (agent) {
    await this.createInboxMember(agent);
  };

  Inbox.prototype.remove_member = async function (agent) {
    await this.removeInboxMember(agent);
  };

  Inbox.prototype.webhook_data = function (agent) {
    return {
      id: this.id,
      name: this.name
    };
  };
  return Inbox;
};
