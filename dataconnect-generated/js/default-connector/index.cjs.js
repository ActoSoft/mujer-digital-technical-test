const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'mujer-digital-technical-test',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

