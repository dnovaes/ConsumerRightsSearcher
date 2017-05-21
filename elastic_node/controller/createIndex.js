var client = require("../connection.js");
var process = require("process");

client.indices.create({
  index: process.argv.slice(2).toString()
}, function(err, resp, status){
  if(err){
    console.log(err);
  }else{
    console.log("create", resp);
  }
});

