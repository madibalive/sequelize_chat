/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define(
    'Subscription',
    {
      id: {
        type: DataTypes.BIGINT,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      lastSeenCount: {
        type: DataTypes.INTEGER,
        field: 'last_seen_count',
        defaultValue: 0,
        allowNull: false
      },
      token: {
        type: DataTypes.STRING,
        field: 'token',
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      schema: 'public',
      tableName: 'subscription',
      timestamps: true
    }
  );

  Subscription.associate = models => {
    Subscription.hasOne(models.Message, {
      as: 'LastReadMessage',
      foreignKey: 'last_read_message_id'
    });

    Subscription.belongsTo(models.Conversation, {
      as: 'Conversation',
      foreignKey: 'conversation_id'
    });

    Subscription.belongsTo(models.Contact, {
      as: 'Contact',
      foreignKey: 'contact_id'
    });
    Subscription.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });

    Subscription.addScope('conversation', () => ({
      include: [{ model: sequelize.model.Conversation, as: 'Conversation' }]
    }));
  };

  const webhook_data = function () {
    return {
      id: this.id,
      name: this.name,
      type: 'agent_bot'
    };
  };

  const getMySubscriptions = async function (user_id) {
    let subscriptions = await sequelize.model.Subscription.findAll({
      where: {
        user_id: user_id,
        deleted: false
      },
      // include: ['conversation.lastmessage', 'user']
    });
    return subscriptions;
  };

  const notifyUserTyping = async function (user_id, conversation_id) {
    var pushPayload = {
      type: 'userTyping',
      chatId: conversation_id,
      userId: user_id
    };
    // Find all subscriptions for the chat and notify the other users
    let subscription = await sequelize.model.Subscription({
      where: {
        user_id,
        conversation_id
      }
    });

    subscriptions.forEach(function (sub) {
      // sendSocketPushToUser(sub.user.id, pushPayload);
    });
  };

  const markChatAsRead = async function (user_id, conversation_id) {
    let subscription = await sequelize.model.Subscription({
      where: {
        user_id,
        conversation_id
      }
    });

    subscription.lastReadMessage = subscription.chat.lastMessage;
    subscription.lastSeenCount = subscription.chat.messageCount;
    return subscription.save();
  };

  Subscription.prototype.current_conversation = async function () {
    // conversations.last
  };

  Subscription.prototype.webhook_data = webhook_data;
  Subscription.markChatAsRead = markChatAsRead;
  Subscription.notifyUserTyping = notifyUserTyping;
  Subscription.getMySubscriptions = getMySubscriptions;

  return Subscription;
};
