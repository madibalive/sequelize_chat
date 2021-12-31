import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import index from '../index';

const { expect } = chai;
chai.use(chaiHttp);

let token;
chai.use(chaiHttp);

describe('USER ROLES TESTS', () => {
  before(done => {
    chai
      .request(index)
      .post('/api/v1/auth/login')
      .send({
        email: 'jean@andela.com',
        password: 'Bien@BAR789'
      })
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
});
