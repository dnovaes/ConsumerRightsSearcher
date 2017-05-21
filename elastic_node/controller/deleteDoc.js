var client = require('../connection.js');

client.delete({  
  index: 'cdc',
  title: 'title2'
},function(err,resp,status) {
    console.log(resp);
});
