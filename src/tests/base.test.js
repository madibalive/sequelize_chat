import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testing english index page ', () => {
  it('should return a message from index page.', done => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Welcome to projectcoin API');
        done();
      });
  });
});

describe('NON EXISTENT ROUTE TEST', () => {
  it('should return an error message that the route is not found.', done => {
    chai
      .request(app)
      .get('/cars')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.status).to.equal(404);
        expect(res.body.error).to.equal('Route /cars not found');
        done();
      });
  });
});
