const io = require('socket.io-client');
const port = 3800;
const BASE_URL = `http://localhost:${port}`;

let socket;

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaXNWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjA2MzUzNTc4LCJleHAiOjE2MDY0Mzk5Nzh9.Y5z6CFKua2YE51azpD4Blf_mShkJuGkRa2UtRO-B7Po';
let conversation;
let conversations;
let subscriptions;
let i = 1;

// login

// user = user.data;
// init io connect

socket = io(BASE_URL, {
  'reconnection delay': 0,
  'reopen delay': 0,
  'force new connection': true,
  query: {
    token: token
  },
  transportOptions: {
    polling: {
      extraHeaders: { token: token }
    }
  }
});

socket.on('connect', function () {
  console.log('WebSocket client connected');
});

// listen on message events
socket.on('message', function (event) {
  try {
    // var response = JSON.parse(event.data);
    console.log(event);
  } catch (e) {
    console.log(e);
    return;
  }

  // switch (response.messageType) {
  //   case 'Login':
  //     clientId = response.client.id;
  //     break;
  // }
});

socket.on('disconnect', function () {
  console.log('Connection Closed');
  setTimeout(function () {
    socket = io(BASE_URL, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      query: {
        token: token
      },
      transportOptions: {
        polling: {
          extraHeaders: { token: token }
        }
      }
    });
  }, 500);
});
