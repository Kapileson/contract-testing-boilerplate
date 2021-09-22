let pact = require('@pact-foundation/pact-node');
const path = require('path');

let opts = {
  pactFilesOrDirs: [path.resolve(__dirname, '../../pacts/')],
  pactBroker: 'http://pact_broker.com:8282',
  pactBrokerUsername: '',
  pactBrokerPassword: '',
  consumerVersion: '1.0',
  tags: ["dev"]
};

pact
  .publishPacts(opts)
  .then(() => {
    console.log('Pact contract published!');
  })
  .catch((e) => {
    throw new Error('Pact contract failed to publish: ', e)
  });
