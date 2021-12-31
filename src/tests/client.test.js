import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import index from '../index';
import io from 'socket.io-client';

const { expect } = chai;
let aime, user_1, user_2, user_3;
let singleChat, convo_1, groupChat;
chai.use(chaiHttp);

const port = process.env.PORT || 3800;
const BASE_URL = `http://localhost:${port}`;
let socket, socket2, socket3;

describe('CONVERSATION TESTS', () => {
  before(done => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'aime@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        aime = res.body.data;
        if (!socket)
          socket = io(BASE_URL, {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true,
            transports: ['false', 'websocket'],
            query: {
              token: aime
            },
            transportOptions: {
              polling: {
                extraHeaders: { token: aime }
              }
            }
          });
        done();
      });
  });

  it('should login jean', done => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jean@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        if (!socket2)
          socket2 = io(BASE_URL, {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true,
            transports: ['false', 'websocket'],
            query: {
              token: res.body.data
            },
            transportOptions: {
              polling: {
                extraHeaders: { token: res.body.data }
              }
            }
          });
        done();
      });
  });
  it('should login jdev', done => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jdev@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        if (!socket3)
          socket3 = io(BASE_URL, {
            'reconnection delay': 0,
            'reopen delay': 0,
            'force new connection': true,
            transports: ['false', 'websocket'],
            query: {
              token: res.body.data
            },
            transportOptions: {
              polling: {
                extraHeaders: { token: res.body.data }
              }
            }
          });
        done();
      });
  });
  it('should create new single conversation aime 5,jean 2', done => {
    chai
      .request(index)
      .post('/api/v1/conversations')
      .set('token', aime)
      .send({
        otherUserIds: [2]
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        singleChat = res.body.token.id;
        done();
      });
  });

  it('should return an exiting conversation aime 5,jean 2', done => {
    chai
      .request(index)
      .post('/api/v1/conversations')
      .set('token', aime)
      .send({
        otherUserIds: [2]
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(singleChat).to.equal(res.body.token.id);
        done();
      });
  });

  it('should create new group conversation', done => {
    chai
      .request(index)
      .post('/api/v1/conversations')
      .set('token', aime)
      .send({
        otherUserIds: [1, 3],
        groupName: 'Bien@BAR789'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        groupChat = res.body.token.id;
        done();
      });
  });

  it('should add aime 5, to group conversation', done => {
    chai
      .request(index)
      .post('/api/v1/conversations/' + groupChat + '/subscribe')
      .set('token', aime)
      .send({
        userIds: [5]
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should send new message to single chat', done => {
    chai
      .request(index)
      .post('/api/v1/conversations/messages')
      .set('token', aime)
      .send({
        message_type: 'processMessage',
        conversation_id: singleChat,
        payload: 'hello first chat message',
        serial: '12413213'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // singleChat = res.body.token.id;
        done();
      });

    // socket.emit(
    //   'message',
    //   {
    //     messagetype: 'processMessage',
    //     conversationId: singleChat,
    //     message: 'hello first chat message',
    //     serial: '1231413213'
    //   },
    //   () => {
    //     done();
    //   }
    // );
  });
  it('should create new message for group chat', done => {
    chai
      .request(index)
      .post('/api/v1/conversations/messages')
      .set('token', aime)
      .send({
        message_type: 'processMessage',
        conversation_id: groupChat,
        payload: 'hello first chat message',
        serial: '1231413213'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // singleChat = res.body.token.id;
        done();
      });

    // socket.emit(
    //   'message',
    //   {
    //     messagetype: 'processMessage',
    //     conversationId: singleChat,
    //     message: 'hello first chat message',
    //     serial: '1231413213'
    //   },
    //   () => {
    //     done();
    //   }
    // );
  });

  it('should notify aime typing in single conversation', done => {
    chai
      .request(index)
      .post('/api/v1/conversations/' + singleChat +  '/typing')
      .set('token', aime)
      .send({
        conversation_id: singleChat,
        userId: '1231413213'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should mark single conversation as read', done => {
    chai
      .request(index)
      .get('/api/v1/conversations/' + singleChat + '/mark-as-read')
      .set('token', aime)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should get conversation ', done => {
    chai
      .request(index)
      .get('/api/v1/conversations/' + convo_1)
      .set('token', aime)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should get aimes subscriptions', done => {
    chai
      .request(index)
      .get('/api/v1/conversations/subscriptions/')
      .set('token', aime)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  // afterEach(done => {
  //   // if (socket.connected) {
  //   //   socket.disconnect();
  //   // }
  //   done();
  // });
});
