const config = require('nconf');

config.argv()
  .env()
  .file({ file: './config.json' });

module.exports = config;
