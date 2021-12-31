import uuid from 'uuid/v4';
import dotenv from 'dotenv';
import localStorage from 'localStorage';
import db from '../database/models';
import { provideToken } from '../utils/tokenHandler';
import Response from '../utils/ResponseHandler';
import Sequelize from 'sequelize';
import { connectedUsers } from '../middlewares/io';
import SendNotification from '../utils/sendNotification';

// import Queue from '../utils/queue';
// import ConfirmationMail from '../jobs/ConfirmationMail';

dotenv.config();
const env = process.env.NODE_ENV || 'WalletTopup';

export default class ConversationController {
  static async createMessage(req, res) {
    try {
      let data = req.body;
      data.user = req.user;
      let message = await db.Message.create({
        user_id: data.user.id,
        conversation_id: data.conversation_id,
        message_type: data.type,
        serial: data.serial,
        content: data.payload
      });
      let options = { req };
      await db.Message.onMessageHandler(message, options);

      return Response.signupResponse(res, 200, 'User is successfully created', message);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async createChat(req, res) {
    try {
      let data = req.body;
      let conversation = await db.Conversation.findExistingChat(req.user.id, data.otherUserIds);
      if (!conversation) {
        // No chat found, need to create a new chat
        conversation = await db.Conversation.createChat(req.user.id, data.otherUserIds, data.groupName);
      }
      return Response.signupResponse(res, 200, 'User is successfully created', conversation);
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async getChat(req, res) {
    try {
      let data = req.params;
      let conversations = await db.Conversation.getConversation(data.conversationid);
      return Response.signupResponse(res, 200, 'User is successfully created', conversations);
    } catch (error) {
      // await t.rollback();
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async deleteConversations(req, res) {
    let t;

    try {
      t = await db.sequelize.transaction();
      let data = req.body;
      data.user = req.user;

      await db.Conversation.deleteConversations(data.user, data.conversationIds);
      await t.commit();
      return Response.signupResponse(res, 200, 'User is successfully created', {});
    } catch (error) {
      await t.rollback();
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async markChatAsRead(req, res) {
    let t;

    try {
      // t = await db.sequelize.transaction();
      // await t.commit();
      let data = req.params;
      data.user = req.user;
      let updatedSubscription = await db.Conversation.markChatAsRead(data.user.id, data.conversationid);

      return Response.signupResponse(res, 200, 'User is successfully created', updatedSubscription);
    } catch (error) {
      // await t.rollback();
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async getMySubscriptions(req, res) {
    let t;
    try {
      // t = await db.sequelize.transaction();
      let data = { user: req.user };

      let subscriptions = await db.Subscription.getSubscriptionsForUser(data.user.id);
      // await t.commit();
      return Response.signupResponse(res, 200, 'User is successfully created', subscriptions);
    } catch (error) {
      // await t.rollback();
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async subscribeToChat(req, res) {
    let t;
    try {
      // t = await db.sequelize.transaction();

      let data = req.params;
      data.userIds = req.body.userIds;
      let subscriptions = await db.Conversation.subscribeToChat(data.userIds, data.conversationid);
      // await t.commit();
      return Response.signupResponse(res, 200, 'User is successfully created', subscriptions);
    } catch (error) {
      // await t.rollback();
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async addUserToChat(req, res) {
    let t;

    try {
      // t = await db.sequelize.transaction();
      let data = req.params;
      let conversation = await db.Conversation.addUserToChat(data.userId, data.conversationId);
      // await t.commit();
      return Response.signupResponse(res, 200, 'User is successfully created', conversation);
    } catch (error) {
      // await t.rollback();
      return Response.errorResponse(res, 500, error.message);
    }
  }

  static async notifyUserTyping(req, res) {
    try {
      let data = req.body;
      let context = [];
      let pushPayload = {
        type: 'userTyping',
        chatId: data.conversation_id,
        userId: req.user.id
      };
      let subscriptions = await db.Subscription.getSubsToNotifyUserTyping(req.user.id, data.conversation_id);
      subscriptions.forEach(async function (sub) {
        context.push(sub.user_id);
      });
      await SendNotification.sendSocketPushToUser(context, pushPayload, req);
      return Response.signupResponse(res, 200, 'User is successfully created', {});
    } catch (error) {
      return Response.errorResponse(res, 500, error.message);
    }
  }
}
