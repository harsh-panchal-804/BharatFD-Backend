const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 

chai.use(chaiHttp);
const { expect } = chai;

describe('FAQ API Tests', () => {
  it('should GET all FAQs', (done) => {
    chai
      .request(app)
      .get('/faqs')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});
