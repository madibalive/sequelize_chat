/* eslint new-cap: "off", global-require: "off" */

const { Sequelize } = require('sequelize');

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
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        field: 'name'
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

    // Subscription.belongsTo(models.Contact, {
    //   as: 'Contact',
    //   foreignKey: 'contact_id'
    // });
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
    let subscriptions = await sequelize.models.Subscription.findAll({
      where: {
        user_id: user_id,
        deleted: false
      },
      include: [
        {
          model: sequelize.models.Conversation,
          as: 'Conversation',
          include: [
            {
              model: sequelize.models.Subscription,
              as: 'Subscription',
              include: [
                {
                  model: sequelize.models.User,
                  as: 'User'
                }
              ]
            },
            {
              model: sequelize.models.Message,
              as: 'LastMessage'
            }
          ]
        }
      ]
    });
    return subscriptions;
  };

  const notifyUserTyping = async function (userId, conversationId) {
    let subscriptions = await sequelize.models.Subscription.findAll({
      where: {
        conversation_id: conversationId,
        user_id: {
          [Sequelize.Op.ne]: userId
        }
      }
    });
    return subscriptions;
  };

  Subscription.prototype.current_conversation = async function () {
    // conversations.last
  };

  Subscription.prototype.webhook_data = webhook_data;
  Subscription.getSubsToNotifyUserTyping = notifyUserTyping;
  Subscription.getSubscriptionsForUser = getMySubscriptions;

  return Subscription;
};
