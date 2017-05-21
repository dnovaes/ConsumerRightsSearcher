var client = require("../connection.js");

// delete({index: "nameofindex"})
client.indices.delete({index: process.argv[2]}, function(err, resp, status){
    console.log("delete", resp);
});

