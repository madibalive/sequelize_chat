import db from './database/models';

const createChat = async function (context, socket) {
  let conversation = await db.Conversation.findExistingChat(context.user.id, context.otherUserIds);
  if (!conversation) {
    // No chat found, need to create a new chat
    conversation = await db.Conversation.createChat(context.user.id, context.otherUserIds, context.groupName);
  }
  return {
    messageType: 'OK',
    conversations: conversation
  };
};

const getChat = async function (context, socket) {
  try {
    let conversations = await db.Conversation.getConversation(context.conversationid);
    return {
      messageType: 'OK',
      conversations: conversations
    };
  } catch (error) {}
};

const deleteConversations = async function (context, socket) {
  let t;
  try {
    t = await db.sequelize.transaction();
    let deletedConversations = await db.Conversation.deleteConversations(context.user, context.conversationIds);
    await t.commit();
    return {
      messageType: 'OK',
      conversations: deletedConversations
    };
  } catch (error) {
    await t.rollback();
  }
};

const markChatAsRead = async function (context, socket) {
  let updatedSubscription = await db.Conversation.markChatAsRead(context.user.id, context.conversationid);
  return {
    messageType: 'OK',
    subscriptions: updatedSubscription
  };
};

const getMySubscriptions = async function (context, socket) {
  let subscriptions = await db.Subscription.getSubscriptionsForUser(context.user.id);
  return {
    messageType: 'OK',
    subscriptions: subscriptions
  };
};

const subscribeToChat = async function (context, socket) {
  let subscriptions = await db.Subscription.subscribeToChat(context.conversationid, context.userIds);
  return {
    messageType: 'OK',
    subscriptions: subscriptions
  };
};

const addUserToChat = async function (context, socket) {
  let conversation = await db.Conversation.addUserToChat(context.userId, context.conversationId);
  return {
    messageType: 'OK',
    conversations: conversation
  };
};

const notifyUserTyping = async function (context, socket) {
  let subscriptions = await db.Conversation.getSubsToNotifyUserTyping(context.userId, context.conversationId);
  subscriptions.forEach(function (sub) {
    // if (connectedUsers[sub.userid]) socket.to(sub.userid).emit('message:success', JSON.stringify(Response.emitResponse(200, pushPayload)));
    // sendSocketPushToUser(sub.get('user').id, pushPayload);
  });
};
const Pickup = async function (context, callback) {
  clientRepository.get(context.message.id, function (err, client) {
    if (err) return callback(err);

    client.pickup(context, callback);
  });
};

function Dispatcher() {}

Dispatcher.prototype = {
  createChat,
  getChat,
  deleteConversations,
  markChatAsRead,
  getMySubscriptions,
  subscribeToChat,
  addUserToChat,
  notifyUserTyping
};

Dispatcher.prototype.processMessage = async function (data, connection) {
  // console.log(data);

  var message;
  if (!(message = this._parseJSONData(data, connection))) return;

  // Find message handler
  var messageHandler;
  if (!(messageHandler = this._findMessageHandler(message, connection))) return;

  // // Validate token
  // if (!this._accessWithoutToken(message.messageType) && !this._tokenValid(message, connection)) return;

  // Process request and send response
  try {
    let result = await messageHandler.call(this, { message: message, connection: connection });
    console.log('Sending response:');
    // Send response
    connection.broadcast.emit(result, function (err) {
      if (err) return console.log(err);
    });
  } catch (error) {
    console.log(err.stack);
    return responseWithError.call(connection, err.message);
  }
};

Dispatcher.prototype._parseJSONData = function (data, connection) {
  var message;
  try {
    message = JSON.parse(data);
    console.log(util.inspect(message, { depth: 3, colors: true }));
  } catch (e) {
    responseWithError.call(connection, e.message);
  }

  return message;
};

Dispatcher.prototype._findMessageHandler = function (message, connection) {
  if (message.app !== 'client' && message.app !== 'web' && message.app !== 'god') {
    return responseWithError.call(connection, 'Unknown client app: ' + message.app);
  }

  var handler = this.__proto__[message.messageType];
  if (!handler) {
    return responseWithError.call(connection, 'Unsupported message type: ' + message.messageType);
  }

  return handler;
};

const withTimeout = (onSuccess, onTimeout, timeout) => {
  let called = false;

  const timer = setTimeout(() => {
    if (called) return;
    called = true;
    onTimeout();
  }, timeout);

  return (...args) => {
    if (called) return;
    called = true;
    clearTimeout(timer);
    onSuccess.apply(this, args);
  };
};

const responseWithError = function (text, errorCode) {
  var msg = MessageFactory.createError(text, errorCode);
  console.log('Sending response:');
  try {
    this.send(JSON.stringify(msg));
  } catch (e) {}
};

module.exports = Dispatcher;
