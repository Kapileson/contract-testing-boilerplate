const chai = require('chai');
const nock = require('nock');
const expect = chai.expect;
const API_PORT = 9123;
const { Consumer } = require('../consumer.js');

const API_HOST = `http://localhost:${API_PORT}`;

describe('Consumer Test', () => {
  it('can get the date from provider', async () => {
    nock(API_HOST)
      .get('/provider/validDate?date=2021-09-24')
      .reply(200, {
        date: '24-09-2021',
        count: 5
      });

    const response = await Consumer.getDetails(API_HOST, '2021-09-24');
    expect(response).to.deep.equal({
      date: '24-09-2021',
      expiry: 'lifetime',
      count: 2.5
    });
  });
});
