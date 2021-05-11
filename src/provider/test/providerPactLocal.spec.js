const { Verifier } = require('@pact-foundation/pact');
const { server, provider } = require('../provider');
const path = require('path');

var opts = {
  providerBaseUrl: 'http://localhost:8081',
  pactUrls: [
    path.resolve(
      __dirname,
      '../../../pacts/dateconsumer-dateprovider.json'
    ),
  ],
};

describe('Pact Provider verification', () => {
  it('Should validate the date consumer', async () => {
    await new Verifier(opts).verifyProvider();
    server.close();
  });
});
