var client            = require('../connection.js');
//var bodyParser        = require('body-parser');

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true}));

/*
app.post('/', function(res, req){
  data = req.body.claimdata;
  res.render(data);
});
*/

search = function(content, res){
  var result = [];

  console.log(res);

  client.search({
    body:{
      query:{
        match: {"content": content}
      },
    }
  }, function(error, response, status){
    if(error){
      console.log("search error: "+error);
    }
    else{
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
          console.log(hit);
          result.push(hit);
      })

      res.write("this is a test");
    }
  });

}

module.exports = search;
