var es = require('elasticsearch');

var client = new es.Client({
  hosts:[
    'http://localhost:9200',
  ],
  log: 'trace',
  index:{
    blocks: {
      read_only: true
    }
  }
});

module.exports = client;
