const { Pact } = require('@pact-foundation/pact');
const { Consumer } = require('../consumer');
const path = require('path');
const chai = require('chai');
const nock = require('nock');
const interactions = require('../pact/interactions');
const API_PORT = 1234;

const API_HOST = `http://localhost:${API_PORT}`;
const expect = chai.expect;
const MOCK_SERVER_PORT = 9123;

describe('Pact Consumer', () => {
  const provider = new Pact({
    consumer: 'DateConsumer',
    provider: 'DateProvider',
    port: MOCK_SERVER_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'ERROR',
    pactfile_write_mode: 'update',
    spec: 1,
  });

  describe('Consumer Driven Contract', () => {
    before(() => provider.setup());

    //afterEach(() => provider.verify());

    afterEach(() => provider.removeInteractions());

    after(() => provider.finalize());
    
    describe('When a call to date provider is made', () => {
      
      describe('and valid date is provided', () => {
        it('can process the JSON payload from the date provider', async () => {
          provider.addInteraction(interactions.validDate);
          nock(API_HOST)
            .get('/provider/validDate?date=2021-05-13')
            .reply(200, {
              date: '2021, May 13, 2021',
              format: 'valid',
              expiry: 'lifetime',
              count: 5,
            });

          const response = await Consumer.parseDate('2021-05-13');
          expect(response).to.deep.equal({
            date: '2021, May 13, 2021',
            format: 'valid',
            expiry: 'lifetime',
            count: 2.5,
          });
        });
      });
      describe('and invalid date is provided', () => {
        it('Should thrown error when date param is null', async () => {
          provider.addInteraction(interactions.invalidDate);
          nock(API_HOST)
            .get("/provider/validDate?date=''")
            .reply(404, { error: 'validDate is required' });

          const response = await Consumer.parseDate('');
          expect(response.error).to.be.oneOf(['validDate is required',undefined]);
        });
      });
    });
  });
});
