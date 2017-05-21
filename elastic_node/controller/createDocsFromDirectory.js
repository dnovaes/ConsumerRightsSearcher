var fs = require("fs"); //module to read files
var getDirTitle = require("dirTitle"); //module with utils functions for directory
var client = require("../connection.js"); //module responsible for the call to API elastic search

var dirPath = process.argv[2]!= undefined ? process.argv[2]: 0; 
if (!dirPath){
  console.log("Please provide a valid path as argument");
  process.exit();
}

console.log("Initiating the index of document by directory");

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
          data = fs.readFileSync(dirPath+file).toString();
//          fs.readFile(dirPath+file, 'utf8', function (err, data){
            if(err){
              return console.log(err);
            }

            var title = getDirTitle(dirPath);

            var titleName = fs.readFileSync(dirPath+title+".txt").toString().trim();

            // key 'title' and 'type' are required.
            jsonObj = {
              index: 'cdc',
              type: titleName.trim(),
              body: {
                title: title,
                content: data
              }
            };
            //debug
            //console.log(jsonObj);
            
            //index new documents based on the json object
            client.index(jsonObj, function(err, resp, status){
                console.log(resp);
            });
//          });
        }
      });
  });
}

printAllFiles(dirPath);
