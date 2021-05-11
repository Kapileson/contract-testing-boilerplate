let pact = require('@pact-foundation/pact-node');
const path = require('path');

let opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../../pacts/')],
  pactBroker: 'http://pact_broker.com:8282',
  pactBrokerUsername: '',
  pactBrokerPassword: '',
  consumerVersion: '2.0',
  tags: ["prod", "test"]
};

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract publishing complete!');
  })
  .catch((e) => {
    throw new Error('Pact contract publishing failed: ', e)
  });
