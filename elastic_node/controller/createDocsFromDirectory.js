var fs = require("fs");
var getDirTitle = require("dirTitle");

var dirPath = process.argv[2];

// Initial function to generate json objects to request a index document in the elastic search

// looping through the documents and print all the docs in the directory
var printAllFiles = function(dirPath, callback){
  fs.readdir( dirPath, function(err, files){
      if(err){
        console.error("Could not list the directory.", err);
        process.exit(1);
      }
 
      var jsonObj;
      files.forEach( function( file, index){
        if(fs.lstatSync(dirPath+file).isDirectory()){

          //pass dir+file as the new dir to be looped / looked at
          var newDirPath = dirPath+file+'/';
         
          console.log("reading a new dir: "+newDirPath);
          printAllFiles(newDirPath, null);
          return;
        }

        if(file != "notes_cdc"){
          console.log(file);
          fs.readFile(dirPath+file, 'utf8', function (err, data){
            if(err){
              return console.log(err);
            }

            var title = getDirTitle(dirPath);
            var titleName = fs.readFileSync(dirPath+title+".txt").toString();

            jsonObj = {
              index: 'cdc',
              title: title,
              title_name: titleName,
              content: data
            };

            /*
            client.index(jsonObj), function(err, resp, status){
              console.log(resp);
            });
            */

          });
        }
      });
  });
}

printAllFiles(dirPath);
