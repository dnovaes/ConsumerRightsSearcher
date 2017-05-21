var client = require("../connection.js");

client.count({index: 'cdc'},function(err,resp,status) {  
  console.log("cdc",resp);
});
