var es = require('elasticsearch');

var client = new es.Client({
  hosts:[
    'http://localhost:9200',
  ],
  log: 'trace'
});

module.exports = client;
