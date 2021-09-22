const { Pact } = require('@pact-foundation/pact');
const { Consumer } = require('../consumer');
const path = require('path');
const chai = require('chai');
const { somethingLike: like, term } = require("@pact-foundation/pact").Matchers;

const expect = chai.expect;
const PACT_PORT = 1234;
const PACT_HOST = `http://localhost:${PACT_PORT}`;

describe('Pact Consumer', () => {
  const provider = new Pact({
    consumer: 'DateConsumer',
    provider: 'DateProvider',
    port: PACT_PORT,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'ERROR',
    pactfile_write_mode: 'update'
  });

  describe('Consumer Driven Contract', () => {
    before(() => provider.setup());

    afterEach(() => provider.verify());

    afterEach(() => provider.removeInteractions());

    after(() => provider.finalize());
    
    describe('When a call to date provider is made', () => {

      describe('and valid date is provided', () => {
        it('can process the JSON payload from the date provider', async () => {
          provider.addInteraction({
            state: "Valid Date",
            uponReceiving: "a request for JSON data",
            withRequest: {
              method: "GET",
              path: "/provider/validDate",
              query: { date: "2021-09-24" }
            },
            willRespondWith: {
              status: 200,
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              },
              body: {
                date: term({generate:"24-09-2021", matcher: '\\d{2}-\\d{2}-\\d{4}'}),
                count: like(5)
              }
          }});

          const response = await Consumer.getDetails(PACT_HOST, '2021-09-24');
          expect(response).to.deep.equal({
            date: '24-09-2021',
            expiry: 'lifetime',
            count: 2.5,
          });
        });
      });
    });
  });
});
