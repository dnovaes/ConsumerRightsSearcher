var client = require("../connection.js");

// delete({index: "nameofindex"})
client.indices.delete({index: process.argv.slice(2).toString()}, function(err, resp, status){
    console.log("delete", resp);
});

