const chai = require('chai');
const nock = require('nock');
const expect = chai.expect;
const API_PORT = 8081;
const { Consumer } = require('../consumer.js');

const API_HOST = `http://localhost:${API_PORT}`;

describe('Consumer Test', () => {
  it('can get the date from provider', async () => {
    nock(API_HOST)
      .get('/provider/validDate?date=2021-05-13')
      .reply(200, {
        date: '2021, May 13, 2021',
        format: 'valid',
        expiry: 'lifetime',
        count: 5
      });

    const response = await Consumer.parseDate('2021-05-13');
    expect(response).to.deep.equal({
      date: '2021, May 13, 2021',
      format: 'valid',
      expiry: 'lifetime',
      count: 2.5
    });
  });
});
