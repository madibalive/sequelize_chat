/* eslint new-cap: "off", global-require: "off" */
const NUMBER_OF_PERMITTED_ATTACHMENTS = 15;
const { Op } = require('sequelize');
const { MESSAGE_TYPE, CONVERSATION_STATUS } = require('../../utils/global');
const { default: SendNotification } = require('../../utils/sendNotification');

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    'Message',
    {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      serial: {
        type: DataTypes.STRING,
        field: 'serial',
        unique: true,
        allowNull: true
      },
      content: {
        type: DataTypes.STRING,
        field: 'content',
        allowNull: true
      },

      messageType: {
        type: DataTypes.INTEGER,
        field: 'message_type',
        defaultValue: 0,
        allowNull: false
      },

      private: {
        type: DataTypes.BOOLEAN,
        field: 'private',
        allowNull: true,
        defaultValue: false
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      delivered: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      status: {
        type: DataTypes.INTEGER,
        field: 'status',
        allowNull: true
      },
      sourceId: {
        type: DataTypes.STRING,
        field: 'source_id',
        allowNull: true
      },
      contentType: {
        type: DataTypes.INTEGER,
        field: 'content_type',
        allowNull: true,
        defaultValue: 0
      },
      contentAttributes: {
        type: DataTypes.JSON,
        field: 'content_attributes',
        allowNull: true,
        defaultValue: '{}'
      },
      senderType: {
        type: DataTypes.STRING,
        field: 'sender_type',
        allowNull: true
      }
    },
    {
      schema: 'public',
      tableName: 'messages',
      timestamps: true
    }
  );

  Message.associate = models => {
    Message.belongsTo(models.Conversation, {
      as: 'Conversation',
      foreignKey: 'conversation_id'
    });
    Message.belongsTo(models.User, {
      as: 'User',
      foreignKey: 'user_id'
    });
    // Message.belongsTo(models.Contact, {
    //   as: 'Sender',
    //   foreignKey: 'sender_id'
    // });

    // Message.hasMany(models.Attachment, {
    //   as: 'Attachment',
    //   foreignKey: 'attachment_id'
    // });

    // Message.addScope(
    //   'orderby',
    //   (direction = desc => {
    //     order: direction;
    //   })
    // );

    Message.addScope('unread_since', created_at => ({
      where: {
        created_at: {
          [Op.gt]: created_at
        }
      }
    }));

    // Message.addScope('attachments', created_at => ({
    //   include: [{ model: sequelize.models.Attachment, as: 'Attachemnt' }]
    // }));
    Message.addScope('chat', created_at => ({
      where: {
        messageType: {
          [Op.ne]: MESSAGE_TYPE['activity']
        }
      }
    }));
  };

  const onMessageHandler = async function (instance, options) {
    let currentUser = await instance.getUser();
    let updatedSubscriptions = [];
    let payloads = [];
    // let sender = await instance.getSender();
    // if (!sender) return;
    let conversation = await instance.getConversation({
      include: [{ model: sequelize.models.Subscription, as: 'Subscription' }]
    });

    await conversation.setLastMessage(instance);
    await conversation.increment('messageCount');

    for (const subscription of conversation.Subscription) {
      var userId = subscription.user_id;

      if (currentUser.id == userId) {
        console.log('Skipping originator: ' + userId);
      } else {
        console.log('Notifying: ' + userId);
        // var message = request.object.get('message') == null ? 'Picture' : request.object.get('message');
        var data = {
          type: 'newMessageInChat',
          userId: currentUser.id,
          chatId: instance.conversation_id,
          name: currentUser.name,
          messageId: instance.id,
          message: instance.content,
          timestamp: instance.createdAt
        };
        await SendNotification.sendPushToUser(userId, data, options.req);
        // Check if the subscription should become reactivated (from being deleted)
        if (subscription.deleted == true) {
          subscription.deleted = false;
          // await subscription.save({ t });
          updatedSubscriptions.push(subscription.save());
        }
      }
    }
    try {
      if (updatedSubscriptions && updatedSubscriptions.length > 0) updatedSubscriptions = await Promise.all(updatedSubscriptions);
    } catch (error) {}

    try {
      await sequelize.models.Conversation.markChatAsRead(currentUser.id, conversation.id);
    } catch (error) {}
  };

  const push_event_data = async function () {
    // TODO fix
    let attachments = await this.getAttachments();
    let user = await this.getUser();
    // let data = _.merge(
    //   created_at: created_at.to_i,
    //   message_type: message_type_before_type_cast,
    //   conversation_id: conversation.display_id
    // )
    // data.merge!(attachments: attachments.map(&:push_event_data)) if attachments.present?
    // data.merge!(sender: sender.push_event_data) if sender && !sender.is_a?(AgentBot)
    // data.merge!(sender: sender.push_event_data(inbox)) if sender&.is_a?(AgentBot)
    // data
  };

  const webhook_data = async function () {
    let imports = await this.getConversation({
      include: [
        {
          model: sequelize.models.Inbox,
          as: 'Inbox',
          include: [
            {
              model: sequelize.models.Account,
              as: 'Account'
            }
          ]
        }
      ]
    });
    let data = {
      id: id,
      content: content,
      created_at: created_at,
      message_type: message_type,
      content_type: content_type
      // content_attributes: content_attributes,
      // source_id: source_id,
      // sender: sender.try(:webhook_data),
      // inbox: inbox.webhook_data,
      // conversation: conversation.webhook_data,
      // account: account.webhook_data
    };
  };

  const reopen_conversation = async function (instance, options) {
    // let conversation = await instance.getConversation();
    // if (instance.messageType === MESSAGE_TYPE['incoming'] && conversation.status === CONVERSATION_STATUS.resolved) {
    //   conversation.status = CONVERSATION_STATUS.open;
    //   await conversation.save();
    // }
  };

  const notify_via_mail = async function (conversation, options) {
    //  if Redis::Alfred.get(conversation_mail_key).nil? && conversation.contact.email? && outgoing? && !private
    //       # set a redis key for the conversation so that we don't need to send email for every
    //       # new message that comes in and we dont enque the delayed sidekiq job for every message
    //       Redis::Alfred.setex(conversation_mail_key, Time.zone.now)
    //       # Since this is live chat, send the email after few minutes so the only one email with
    //       # last few messages coupled together is sent rather than email for each message
    //       ConversationReplyEmailWorker.perform_in(2.minutes, conversation.id, Time.zone.now)
    //     end
  };

  const dispatch_update_event = async function (conversation, options) {
    // Rails.configuration.dispatcher.dispatch(MESSAGE_UPDATED, Time.zone.now, message: self)
  };
  const execute_after_create_commit_callbacks = async function (conversation, options) {
    // dispatch_create_events
    // send_reply
    // execute_message_template_hooks
  };

  // Conversation.sample = function () {};
  Message.onMessageHandler = onMessageHandler;
  // Conversation.prototype.sample =  function(){}
  Message.prototype.webhook_data = webhook_data;
  Message.prototype.push_event_data = push_event_data;
  // Message.afterCreate(reopen_conversation);
  // Message.afterCreate(notify_via_mail);
  // Message.afterCreate(execute_after_create_commit_callbacks);
  // Message.afterCreate(onMessageHandler);
  // Message.afterCreate(markChatAsRead);
  // Message.afterUpdate(dispatch_update_event);

  return Message;
};
