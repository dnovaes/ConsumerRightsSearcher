var lib = {
  // function remove keywords that are equal to a emptyspace and reestructure the array with the
  // rest of keywords
  rmEmptySpace: function (keywords){
    for(var i in keywords){
      //check for a empty word
      if((keywords[i] == " ") || (keywords[i] == "")){

        // get the "head" of the array
        //check if index 'i' isnt the last index of the keywords.length
        if(parseFloat(i)+1 < keywords.length){
          var head = [];
          //check if 'i' isnt the first element of array
          if(i > 0){
            head = keywords.slice(i-1, i);
          }

          // tail of the array (part after the element removed)
          if((parseFloat(i)+1) == keywords.length){
            var rest = keywords[keywords.length-1];
          }else{
            var rest = keywords.slice(parseFloat(i)+1);
          }
          
          Array.prototype.push.apply(head, rest);
          keywords = head;
          keywords = arguments.callee(keywords);
          return keywords;

        }else{
          //else: last position of array to remove
          keywords = keywords.slice(0, keywords.length-1);
          return keywords;
        }
      }
    }
    return keywords;
  },
  //returns the name of the deepest diretory in the string
  getLastDirName : function(str){
    var indexLast1 = str.lastIndexOf('/');
    var dirName = str.substring(0, indexLast1-1);

    var indexLast = dirName.lastIndexOf('/');
    dirName = str.substring(++indexLast, indexLast1);
    return dirName;
  },
  stopWordsRemoval : function(claim){
  
      var stopwords = "well good bad can could my may might would this those less more same her his our mine my from until only them was were will am among instead otherwise above under what when where do does who that which whom shall , they other are under their it into by for a an of the and to in art. -   or paragraph its section be than may as if there any with one two three four five your on a an";
      var filter_other= "i have had has \\?";
      var filter_romanianNumerals = "I II III IV V VI VII VIII IX X XI XII XIII XIV";
      stopwords = stopwords+" "+filter_romanianNumerals+" "+filter_other;
      stopwords = stopwords.split(" "); 

      var regExp = new RegExp();

      for(var i in stopwords){
        regExp = new RegExp("\\b"+stopwords[i]+"\\b", "i");
        claim = claim.replace(regExp, "");
      }

      //remove emptySpace
      regExpWhiteSpace = new RegExp("(\\s+)", "g");
      claim = claim.replace(regExpWhiteSpace, " ");

      var keywords = claim.split(" ");

      //some cases, the regExp left a '' as a word, this is the trick to remove them just in case.
      for(var i=0; i < keywords.length; i++){
        if (keywords[i] == ''){
          keywords.splice(i, 1);
        }
      }

      return {claim: claim, keywords: keywords}
      //keywords = functions.rmEmptySpace(keywords);
  }
  
};

module.exports = lib;
