import dotenv from 'dotenv';
import db from '../database/models';
import { verifyToken } from '../utils/tokenHandler';
const _ = require('lodash');

dotenv.config();

export const connectedUsers = {};

export const ioMiddleware = async socket => {
  try {
    const { token } = socket.handshake.query;
    const decoded = verifyToken(token);
    const userInfo = await db.User.findOne({ where: { id: decoded.id } });

    if (!decoded.error) {
      if (!connectedUsers[decoded.id]) {
        // connectedUsers[decoded.id] = decoded.id;
        connectedUsers[decoded.id] = [];
      }
      connectedUsers[decoded.id].push(socket.id);
      socket.join(decoded.id);

      // display users that are online
      const userIds = Object.keys(connectedUsers);

      socket.on('message', async dataFromClient => {
        if (dataFromClient.messagetype !== undefined) {
          dispatcher.processMessage(dataFromClient, socket);
        } else {
          socket.emit(
            'MessageTypeNonExistant',
            JSON.stringify({ senderFirstName: 'server', senderLastName: '', message: "message can't be empty or contain only spaces" })
          );
        }
      });

      socket.on('disconnect', () => {
        process.stdout.write('a user is disconnected');
        connectedUsers[decoded.id].forEach((el, index, arr) => {
          if (arr[index] === socket.id) {
            arr.splice(index, 1);
          }
        });
        // connectedUsers = _.omit(connectedUsers, decoded.id);
      });
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      socket.emit('initialize', JSON.stringify({ error: 'The token is not provided or the token provided is an invalid token' }));
    }
  }
};
