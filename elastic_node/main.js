client = require('./connection.js');

client.cluster.health({}, function(err, resp, status){
    console.log("--- Client Health --", resp);
});

client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down! Some error happened');
  }else{
    console.log('All motors working, go ahead! ;)');
  }
});
