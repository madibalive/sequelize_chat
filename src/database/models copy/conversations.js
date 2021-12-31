
/* eslint new-cap: "off", global-require: "off" */

const { CONVERSATION_STATUS } = require('../../utils/global');

module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    'Conversation',
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
        allowNull: true
      },
      serial: {
        type: DataTypes.STRING,
        field: 'serial',
        unique: true,
        allowNull: true
      },
      status: {
        type: DataTypes.INTEGER,
        field: 'status',
        allowNull: false,
        defaultValue: 0
      },

      messageCount: {
        type: DataTypes.INTEGER,
        field: 'message_count',
        defaultValue: 0,
        allowNull: false
      },
      displayId: {
        type: DataTypes.INTEGER,
        field: 'display_id',
        allowNull: true
      },
      userLastSeenAt: {
        type: DataTypes.DATE,
        field: 'user_last_seen_at',
        allowNull: true
      },
      agentLastSeenAt: {
        type: DataTypes.DATE,
        field: 'agent_last_seen_at',
        allowNull: true
      },
      locked: {
        type: DataTypes.BOOLEAN,
        field: 'locked',
        allowNull: true,
        defaultValue: false
      },
      additionalAttributes: {
        type: DataTypes.JSONB,
        field: 'additional_attributes',
        allowNull: true
      },
      uuid: {
        type: DataTypes.UUID,
        field: 'uuid',
        allowNull: true
      },
      identifier: {
        type: DataTypes.STRING,
        field: 'identifier',
        allowNull: true
      }
    },
    {
      schema: 'public',
      tableName: 'conversations',
      timestamps: true
    }
  );

  Conversation.associate = models => {
    Conversation.belongsTo(models.Account, {
      as: 'Account',
      foreignKey: 'account_id'
    });

    Conversation.hasMany(models.Subscription, {
      as: 'Subscription',
      foreignKey: 'conversation_id'
    });
    Conversation.hasMany(models.Inbox, {
      as: 'Inbox',
      foreignKey: 'conversation_id'
    });

    Conversation.hasOne(models.Message, {
      as: 'LastMessage',
      foreignKey: 'last_message_id'
    });
    Conversation.hasMany(models.Message, {
      as: 'Message',
      foreignKey: 'conversation_id'
    });

    // Conversation.belongsTo(models.ContactInbox, {
    //   // as: 'ContactInbox',
    //   foreignKey: 'contact_inbox_id'
    // });

    Conversation.belongsTo(models.User, {
      as: 'Assignee',
      foreignKey: 'assignee_id',
      constraint: false
    });

    Conversation.addScope('lastest', {
      where: {
        isSuccess: true
      }
      // order: desc
    });
    Conversation.addScope('unassigned', {
      where: {
        unassigned: null
      }
    });
    Conversation.addScope('assigned_to', assignee_id => ({
      where: { assignee_id }
    }));

    // Message.addScope('unread_since', created_at => ({
    //   where: {
    //     created_at: {
    //       [Op.gt]: created_at
    //     }
    //   }
    // }));
  };

  const addUserToChat = async function (user_id, conversation_id) {};

  const markChatAsRead = async function (user_id, conversation_id) {
    let t;
    try {
      t = await sequelize.transaction();
      let subscription = await sequelize.models.Subscription.findOne({
        where: {
          user_id: user_id,
          conversation_id: conversation_id
        },
        include: [
          {
            model: sequelize.models.Conversation,
            as: 'Conversation',
            include: [
              {
                model: sequelize.models.Message,
                as: 'LastMessage'
              }
            ]
          }
        ]
      });

      var conversation = subscription.Conversation;
      if (conversation.LastMessage == null) {
        return subscription;
      }

      subscription.lastSeenCount = conversation.messageCount;
      subscription.last_read_message_id = conversation.LastMessage.id;
      subscription.save({ t });
      await t.commit();
      return subscription;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  };

  const deleteConversations = async function (userid, conversationIds) {
    let t;
    try {
      t = await sequelize.transaction();
      let deleted = await sequelize.models.Subscription.update(
        {
          deleted: true
        },
        {
          where: {
            user_id: userid,
            [Sequelize.OP.in]: conversationIds
          }
        },
        { t }
      );
      await t.commit();
      return deleted;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  };

  const findExistingChat = async function (user_id, otherUserIds, t) {
    let conversation;
    if (otherUserIds.length > 1) {
      return conversation;
    }

    let subscriptions = await sequelize.models.Subscription.findAll({
      where: {
        user_id: user_id
      },
      include: [
        {
          model: sequelize.models.Conversation,
          as: 'Conversation',
          required: true,
          include: [
            {
              model: sequelize.models.Subscription,
              as: 'Subscription'
            }
          ]
        }
      ]
    });

    for (const sub of subscriptions) {
      var subsForChat = sub.Conversation.Subscription;
      if (subsForChat != null && subsForChat.length == 2 && (subsForChat[0].user_id == otherUserIds[0] || subsForChat[1].user_id == otherUserIds[0])) {
        // Make sure that the chat is not deleted and if so, undelete it
        if (sub.deleted) {
          sub.deleted = false;
          await sub.save();
        }
        conversation = sub.Conversation;
        return;
      }
    }

    return conversation;
  };

  const createChat = async function (myUserId, otherUserIds, groupName) {
    let t;
    try {
      t = await sequelize.transaction();
      var userIds = otherUserIds;
      userIds.push(myUserId); // Also include own user in the new Chat
      let conversation = await sequelize.models.Conversation.create(
        {
          name: groupName
        },
        { t }
      );

      let subscriptions = [];
      for (var i = 0; i < userIds.length; i++) {
        subscriptions.push({
          user_id: userIds[i],
          conversation_id: conversation.id
        });
      }
      subscriptions = await sequelize.models.Subscription.bulkCreate(subscriptions, { t });
      // Add references to the subscriptions to the Chat
      await conversation.addSubscription(subscriptions, { t });
      // conversation = await conversation.save();

      if (groupName == null && subscriptions.length == 2) {
        // Update all the subscriptions to make sure that they have names
        subscriptions = await conversation.getSubscription({
          include: [
            {
              model: sequelize.models.User,
              as: 'User'
            }
          ]
        });
        subscriptions[0].name = subscriptions[1].User.name;
        subscriptions[1].name = subscriptions[0].User.name;
        await subscriptions[0].save({ t });
        await subscriptions[1].save({ t });
      }
      await t.commit();
      return conversation;
    } catch (error) {
      await t.rollback();
      throw new Error(error);
    }
  };

  const can_reply = async function (agent) {
    // return true unless inbox&.channel&.has_24_hour_messaging_window?
    // last_incoming_message = messages.incoming.last
    // return false if last_incoming_message.nil?
    // Time.current < last_incoming_message.created_at + 24.hours
    return true;
  };

  const set_bot_conversation = async function (conversation, options) {
    // let inbox = await conversation.getInbox();
    // if (inbox && inbox.active) conversation.status = CONVERSATION_STATUS['bot'];
  };

  const RemoveSubsAndChats = async function () {
    let t;
    try {
      t = await sequelize.transaction();
      await sequelize.models.Subscription.destroy(
        {
          where: {
            conversation_id: this.id
          }
        },
        t
      );
      await sequelize.models.Message.destroy(
        {
          where: {
            conversation_id: this.id
          }
        },
        t
      );

      await t.commit();
    } catch (error) {
      await t.rollback();
    }
  };
  const notify_status_change = async function (conversation, options) {
    // {
    //   CONVERSATION_OPENED => -> { saved_change_to_status? && open? },
    //   CONVERSATION_RESOLVED => -> { saved_change_to_status? && resolved? },
    //   CONVERSATION_READ => -> { saved_change_to_user_last_seen_at? },
    //   CONVERSATION_LOCK_TOGGLE => -> { saved_change_to_locked? },
    //   ASSIGNEE_CHANGED => -> { saved_change_to_assignee_id? },
    //   CONVERSATION_CONTACT_CHANGED => -> { saved_change_to_contact_id? }
    // }.each do |event, condition|
    //   condition.call && dispatcher_dispatch(event)
    // end
  };
  const create_activity = async function (conversation, options) {
    // return unless Current.user
    // user_name = Current.user&.available_name
    // create_status_change_message(user_name) if saved_change_to_status?
    // create_assignee_change(user_name) if saved_change_to_assignee_id?
  };
  const notify_conversation_creation = async function (conversation, options) {
    // dispatcher_dispatch(CONVERSATION_CREATED);
  };
  const run_round_robin = async function (instance, options) {
    // # Round robin kicks in on conversation create & update
    // # run it only when conversation status changes to open
    // return unless conversation_status_changed_to_open?
    // return unless should_round_robin?
    // ::RoundRobin::AssignmentService.new(conversation: self).perform
  };

  // Conversation.sample = function () {};
  // Conversation.sample = async function () {};
  // Conversation.prototype.sample =  function(){}
  // Conversation.prototype.sample = async function(){}

  Conversation.beforeCreate(set_bot_conversation);
  Conversation.afterCreate(notify_conversation_creation);
  Conversation.afterSave(run_round_robin);
  Conversation.afterUpdate(notify_status_change);
  Conversation.afterUpdate(create_activity);
  Conversation.beforeDestroy(RemoveSubsAndChats);
  Conversation.createChat = createChat;
  Conversation.findExistingChat = findExistingChat;
  Conversation.deleteConversations = deleteConversations;
  Conversation.markChatAsRead = markChatAsRead;
  Conversation.prototype.can_reply = can_reply;
  Conversation.prototype.update_assignee = async function (agent) {
    await this.setAssignee(agent);
  };

  Conversation.prototype.toggle_status = async function () {
    this.status = this.status == CONVERSATION_STATUS['open'] ? CONVERSATION_STATUS['resolved'] : CONVERSATION_STATUS['open'];
    await this.setAssignee(agent);
  };
  Conversation.prototype.lock = async function (agent) {
    this.locked = true;
    await this.save();
  };
  Conversation.prototype.unlock = async function (agent) {
    this.locked = false;
    await this.save();
  };

  Conversation.prototype.update_assignee = async function (agent) {
    await this.setAssignee(agent);
  };

  Conversation.prototype.unread_messages = async function (lastseen) {
    // messages.unread_since(agent_last_seen_at)
  };
  Conversation.prototype.unread_incoming_messages = async function () {
    // messages.incoming.unread_since(agent_last_seen_at)
  };
  Conversation.prototype.notifiable_assignee_change = async function () {
    // return false if self_assign?(assignee_id)
    // return false unless saved_change_to_assignee_id?
    // return false if assignee_id.blank?
    // true
  };

  return Conversation;
};
