import { connectedUsers } from '../middlewares/io';
import Response from './ResponseHandler';
import db from '../database/models';
import sendMsg from './sendEmail';

/**
 *
 * @description send notification class
 * @class SendNotification
 */
export default class SendNotification {
  /**
   * @param {object} notification
   * @param {object} req
   * @param {object} content
   * @return {object} return the io object
   */
  static async sendNotif(notification, req, content) {
    try {
      if (connectedUsers[notification.receiverId]) {
        connectedUsers[notification.receiverId].forEach(async el => {
          await req.io.to(el).emit('notification', JSON.stringify(notification));
        });
      }
      const userInfo = await db.User.findOne({ where: { id: notification.receiverId } });

      if (userInfo.emailNotifications) {
        await sendMsg(notification.receiverEmail, '', content, notification.link);
      }
    } catch (error) {
      return Response.errorResponse(req, 500, error.message);
    }
  }

  // new message
  static async sendPushToUser(receiverId, payload, req) {
    try {
      if (connectedUsers[receiverId]) {
        connectedUsers[receiverId].forEach(async el => {
          await req.io.to(el).emit('message', JSON.stringify(payload));
        });
        // connectedUsers[receiverId].forEach(async el => {
        // });
      }
    } catch (error) {}
  }
  static async sendPushToUsers(context, payload) {
    try {
      context.receivers.forEach(async el => {
        if (connectedUsers[el]) {
          await req.io.to(el).emit('message', JSON.stringify(payload));
        }
      });
    } catch (error) {}
  }

  static async sendPushUsingGCM(context, payload) {
    try {
      if (connectedUsers[context.receiverId]) {
        connectedUsers[context.receiverId].forEach(async el => {
          await req.io.to(el).emit('message', JSON.stringify(payload), response => {
            console.log(response.status); // ok
          });
        });
      }
    } catch (error) {
      return Response.errorResponse(req, 500, error.message);
    }
  }

  // notifyUserTyping,imageUploaded
  static async sendSocketPushToUser(receivers, payload, req) {
    try {
      for (const iterator of receivers) {
        if (connectedUsers[iterator]) {
          connectedUsers[iterator].forEach(async el => {
            await req.io.to(el).emit('message', JSON.stringify(payload));
          });
        }
      }
      // receivers.forEach(async el => {
      //   if (connectedUsers[el]) {
      //     await req.io.to(el).emit('message', JSON.stringify(payload));
      //   }
      // });
    } catch (error) {}
  }
}
