import Axios from 'axios';

const port = 3800;
const BASE_URL = `http://localhost:${port}/api/v1/`;

let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaXNWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNjA2MzUzNTc4LCJleHAiOjE2MDY0Mzk5Nzh9.Y5z6CFKua2YE51azpD4Blf_mShkJuGkRa2UtRO-B7Po';
let conversation;
let timerId;
let subscriptions;
let i = 4;

// create conversation
Axios.post(
  BASE_URL + 'conversations',
  {
    otherUserIds: [2]
  },
  {
    headers: {
      token: token
    }
  }
)
  .then(async data => {
    console.log('conversation');
    console.log(data.data.token);
    conversation = data.data.token;
    return Axios.get(BASE_URL + 'conversations/subscriptions', {
      headers: {
        token: token
      }
    });
  })
  .then(async data => {
    console.log('subscriptions');
    console.log(data.data);
  })
  .catch(err => {
    console.log(err);
  });

// simulate message every for conversation
timerId = setInterval(async function () {
  // Send Ping
  i--;
  Axios.post(
    BASE_URL + 'conversations/' + conversation.id + '/typing',
    {
      message_type: 'processMessage',
      conversation_id: conversation.id
    },
    {
      headers: {
        token: token
      }
    }
  )
    .then(async data => {
      console.log(data.data);
      return Axios.post(
        BASE_URL + 'conversations/messages',
        {
          message_type: 'processMessage',
          conversation_id: conversation.id,
          payload: 'hello first chat message',
          serial: new Date().toString
        },
        {
          headers: {
            token: token
          }
        }
      );
    })
    .then(async data => {
      console.log(data.data);
    })
    .catch(err => {
      console.log(err);
    });

  if (i === 0) {
    clearInterval(timerId);
  }
  i++;
}, 20000);

// setTimeout(function () {
//   // requestPickup.id = clientId;
//   // client.sendWithLog(requestPickup);
// }, 20000);
