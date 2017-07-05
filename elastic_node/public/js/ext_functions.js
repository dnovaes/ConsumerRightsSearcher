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
  }

};

module.exports = lib;
