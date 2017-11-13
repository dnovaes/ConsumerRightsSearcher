
function checkforSynonyms(){
    
  //check if keyword has synonyms
  var kw = app.keywords;
  flag = false;

  for(var i=0; i < kw.length; i++){

    app.synonyms.forEach(function(ele, eli){
      ele.forEach(function(val, vali){
        if( kw[i] == val){
          flag = true;
          kw.splice(i, 1);
        }
      });

      if(flag){
        var length = app.synonyms[eli].length;
        for(var j=0; j<app.synonyms[eli].length; j++){
          kw.unshift(app.synonyms[eli][j]);
        }
        flag = false;
      }
    });

  }
}

function highlight(content){
  //content = content in string to highlight if possible
  //kw = keywords that could be matched and hightlight content
  var kw = app.keywords;

  var kwords = "";
  for(var i in kw){
    if(kw[i]=="?"){
      kw[i]="\\?";
    }
    kwords += "\\b"+kw[i]+"\\b";
    if((parseFloat(i)+1) < kw.length){
      kwords += "|";
    }
  }
  regExp = new RegExp(kwords, "ig");

  if(typeof(content)=="string"){

    content = content.replace(regExp, function(match){
        return "<span class='b'>"+match+"</span>";
    });
    return content;

  }else if(typeof(content)=="object"){

    var articles = [];
    var foundBool = false;

    content.forEach(function(article, i){

      article = article.replace(regExp, function(match){
          foundBool = true;
          return "<span class='b'>"+match+"</span>";
      });
      if(foundBool){
        articles.push(article);
        foundBool = false;
      }

    });
    return articles;

  }
}

//split the content data string in the articles
//return an array o segments of this content string
function splitDocument(content, type){
    var articles=[];

    //pattern for start of the article
    //original pattern at the beggining of the conception:
    //(?<![\w\d])Art(?![\w\d]) but negative lookbehind doesnt work in js (?!>)

    regExp = new RegExp("(?:^|\\s)Artigo([\\d]+)|(?:^|\\s)Art. ([\\d]+)");

    var i=0;
    while(content.length>0){
      //get start pos of the article
      var startPosMatch = regExp.exec(content);

      if(startPosMatch){
        articles[i] = startPosMatch[0];
        content = content.substr(startPosMatch.index+(startPosMatch[0].length), content.length-1);

        var endPosMatch = regExp.exec(content);
        if(endPosMatch){
          articles[i] = articles[i] + content.substr(0, endPosMatch.index-1); 
          content = content.substr(endPosMatch.index, content.length-1);
        }else{
          articles[i] = articles[i] + content;
          content = "";
        }
      }
      i++;
    }
  return articles; 
}

function getSynonyms(keywords){
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };

  keywords.forEach(function(keyword, i){
    axios.get('http://thesaurus.altervista.org/thesaurus/v1?word='+keyword+'&language=en_US&output=json&key=hDIA5jHnTlXbyA8SPLw5').then(function (res){
      console.log("synonyms of keyword: "+keyword);
      res.data.response.forEach(function(val, i){
        console.log(val.list.synonyms);
      });
    }).catch(function(error){
      console.log("found a error in thesaurus");
      console.dir(error);
    });
  });
  return 1;
  //return synonyms keywords
}

Vue.component('comp-result-units',{
  template: '\
    <div :id="divId" class="resultUnit" @click="showRU">\
      <span :id="span1Id" class="ruIcons" v-html="value">{{ value }}</span>\
      <span class="ruText" v-html="data">{{ data }}</span>\
    </div>\
  ',
  props: ['divId', 'span1Id', 'data'],
  methods: {
    showRU: function(){
      var $el =  this.$el;
      var $spanIcon = this.$el.children[0];
      var $spanText = this.$el.children[1];

      if(!this.active){

        Object.assign($el.style, {
          height: "400px", 
          borderColor: "yellowgreen"
        });
        $spanIcon.style.fontSize = "23px";
        Object.assign( $spanText.style, {
          height: $el.style.height,
          overflowY: "scroll"
        });
        this.value = "&#8628";
        this.active = true

      }else{
        
        Object.assign($el.style, {
          height: "45px", 
          borderColor: "black"
        });
        $spanIcon.style.fontSize = "18px";
        Object.assign( $spanText.style, {
          height: $el.style.height,
          overflowY: "hidden"
        });
        this.value = "&#8627";
        this.active = false
        $spanText.scrollTop = 0;
      }
    }
  },
  data: function(){ //this.active and this.value acess here
    return {
      active: false,
      value: "&#8627;"
    }
  }
}); 

Vue.component('comp-chat-msgs',{
  template: '\
      <div :class="divClass" :id="divId">\
        <div class="msg-text">{{ data }}</div>\
        <div class="msg-photo"></div>\
      </div>\
  ',
  props: ['divId', 'divClass', 'data'],
  data: function(){ //this.active and this.value acess here
    return {
      active: false,
    }
  }
});

/*
var vueHeader = new Vue({
  el: '#header-claim',
  data: function(){
    return {
      claimData: ""
    }
  },
  methods: {
  }
}); 
*/

var app = new Vue({
  el: '#div-parent',
  data: function(){
    return {
      phValue: "Descreva seu problema",
      claimData: "",
      claimDataSW: "", //contains the message of keywords of claim
      keywords: "",
      synonyms: [
        ["volta", "reembolso"],
        ["tempo", "dias"],
        ["uso", "vícios"]
        ["usei", "vícios"],
        ["defeito", "vícios"]
      ],
      outputBool: false,
      posBool: false, //indicate to system if it should apply the POS Tagger on the claim or not
      posResult: "", // var the has the contents of pos
      posDivShow: false, //shows the div content of pos taggs
      kwordsDivShow: false, //shows the content of keywords div
      configDivBool: false, //bool that sinalizes the systems if it the configDiv should be visible or not
      resultsBool: false, //bool that sinalize the systems to show the div of results
      resultsTitle: "Documentos: ",
      results: "",
      hits: "",
      resultUnits: [],
      msgUnits: [],
      configSearchStruct: "article",
      questions: [], //contains questions related to every article. ex: question[0] = refere-se ao artigo 1
      //chatbot vars
      nMsgsBot: -1,
      nMsgsUser: -1,
      inputChatbot: ""
    } 
  },
  watch: {
    "vueHeader.claimData": function (newValue, oldValue) {
        this.claimData= vueHeader.claimData;
    },
    //if there is a claim type in the inputfield then outputBool = true (show the desc "searching...")
    claimData: function(event){
      if(app.claimData){
        app.outputBool= true; 
      }else{
        app.outputBool= false; 
      }
    },
    resultsBool: function(){
      if(app.resultsBool){
        app.phValue = "Gostaria de realizar outra queixa?"
      }else{
        app.phValue = "Olá! Como posso ajuda-lo ?"
      }
    }
  },
  methods: {
    isEnterKey: function(e){
      if(e.keyCode == "13"){
        e.preventDefault();
      }
    },
    ajaxSearch: function(e){
      config = {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      };


      console.log("app.claimData: ", app.claimData);

      axios.get('http://localhost:3000/elastic/?q='+app.claimData, config).then(function (res){
        console.log(res);
        app.hits = res.data.hits

        console.log(app.hits.hits);

        //app.hits.hits.length = tell how many results were found.
        if(app.hits.hits.length> 0){
          


          //always clear this variable before pushing new results to the page
          app.resultUnits = []

          //configured to show results as section or articles?
          if(app.configSearchStruct=="section"){

            app.resultsTitle = "Documentos ("+app.hits.hits.length+") :";

            // for each "hit" = document indexed found
            // app.results is handled as RawHtml text

            app.hits.hits.forEach(function(val, i){
              tempContent = val._source.content

              tempContent = highlight(tempContent);
              
              app.resultUnits.push({
                divId: 'resultUnit-'+i,
                span1Id: 'ruStatus-'+i,
                data: tempContent
              });
              //app.index+=1;
            });

          }else{ //split Document in articles

            var j=0;
            console.log(app.keywords);

            app.hits.hits.forEach(function(val, i){
              tempContent = val._source.content

              //split document in articles units
              var articles= splitDocument(tempContent, app.configSearchStruct);

              //highlight words in the articles that matches with the keywords from the user claim
              articles = highlight(articles);
            
              for(var k=0;k<articles.length;k++){
              
                app.resultUnits.push({
                  divId: 'resultUnit-'+j,
                  span1Id: 'ruStatus-'+j,
                  data: articles[k]
                });
                j++;
              }
            });
            app.resultsTitle = "Documentos ("+j+") :";
          }
          //now that the vue.instances are populate, we can visualize the content in the page
          app.resultsBool = true;
          app.hits = "";

          //iniciate chatbot with the user based on the result that we have in app.resultUnits
          //startChatbot();

        }else{
          app.results = "Não encontrei nada relacionado. Poderia escrever novamente com outras palavras?"
          alert(app.results);
          app.resultsBool = false;
          app.results = "";
          app.claimData = "";
        }
      }).catch(function (error){
          console.log(error);
          alert("Erro ao tentar conectar ao elastic search.");
      });
    },
    showPosTagger: function(){
      app.posDivShow = !app.posDivShow; 
    },
    showKeywords: function(){
      app.kwordsDivShow = !app.kwordsDivShow;
    },
    toggleConfigDiv: function(bool){
      app.configDivBool = bool;
    },
    //chatbot methods
    sendMessage: function(e){
      if((e.key == "Enter") && (this.inputChatbot != "") && (this.nMsgsBot > -1)){
       
        this.nMsgsBot++;

        app.msgUnits.push({
          id: 'user-msg-div-'+this.nMsgsBot,
          class: 'div-user msg-unit-el',
          data: this.inputChatbot 
        });
        this.inputChatbot = "";

        let elContentMsgs = document.getElementById("content-msgs");
        setTimeout(function(){
          elContentMsgs.scrollTop = elContentMsgs.scrollHeight;
        }, 200);
      }else if(this.nMsgsBot == -1){
        alert("Digite sua queixa no início da página");
      }
    },
    ajaxSearchSW: function(e){
      //ajaxSearchSW triggered on keyup due to checking e.target.value.length which is update after a content is updated
      if(((e.key == "Enter")||(e.type == "click")) && (app.claimData != "")){
        
        axios.post('/ajax/stopwordsremovalPT', {
          claim: app.claimData,
          posBool: app.posBool
        })
        .then(function (res){
          app.keywords = res.data.keywords;

          //check if keywords has synonyms and add then to app.keywords
          //checkforSynonyms();

          app.claimDataSW = "Keywords: "+app.keywords;

          //var synonyms = getSynonyms(res.data.keywords);

          app.posResult = (res.data.claimTagged != "") ? res.data.claimTagged : "";

          // update the app.claimData with the claim content processed by the backend. 
          // app.claimData will always contain the input for the elasticsearch to search 
          // for matchs in the documents
          //app.claimData = res.data.claim;

          app.ajaxSearch(e);
        })
        .catch(function(err){
          console.log(err);
        });
      }else{
        if(e.target.tagName === "INPUT" && e.target.value.length > 25){
          /*
          let inputTextEl = e.target;
          let textareaEl = document.createElement("textarea-claim");
          textareaEl.value = inputTextEl.value;
          textareaEl.setAttribute("id", "textarea-claim");

          let parentEl = inputTextEl.parentNode;
          parentEl.removeChild(inputTextEl);

          parentEl.appendChild(textareaEl);
          */
          let textareaComponent = Vue.extend({
            template: '\
              <textarea id="textarea-claim" autofocus>{{ this.claimData }} </textarea>\
            ',
            data: function(){
              return {
                claimData: vueHeader.claimData
              }
            },
            mounted: function(){
              this.$nextTick(function(){
                //code that will run only after the
                //entire view has been rendered
              })
            }
          });

          //this will replace #textarea-claim
          new textareaComponent().$mount('#textarea-claim');

          let elClaim = document.getElementById("textarea-claim");
          elClaim.focus();
          
        }
      }
    }
  }
});

function startChatbot(){
  //initialize variables for chatmessages
  app.nMsgsBot = 0;
  app.nMsgsUser= 0;

  //scroll down to the chatbot div
  document.getElementById('chatbot-content').scrollIntoView();

  //make div of typing texts in chatbot to flicker
  elTypingBox = document.getElementById("typingbox");

  //focus on input of typing message to the chatbot
  app.$refs["chatbot-input"].focus();

  var cnt = 0;
  var timer = setInterval(function(){
    if (cnt==9){
      elTypingBox.style.border = "none";
      elTypingBox.style["border-bottom"] = "1px solid darkblue";
      clearInterval(timer);
    }else{
      //cnt % 2 == 1 ? app.$refs["chatbot-input"].style.border = "1px solid gray" : app.$refs["chatbot-input"].style.border = "none";
      cnt % 2 == 1 ? elTypingBox.style.border = "none" : elTypingBox.style.border = "2px solid darkblue";
    }
    cnt++;
  }, 800);

  //instanciate items of the chatbot like the claim of the user typed already, first message of chatbot...stuff
  //User claim [first message] 
  app.msgUnits.push({
    id: 'user-msg-div-'+app.nMsgsUser,
    class: 'div-user msg-unit-el',
    data: app.claimData
  });

  //bot response [first response] 
  app.msgUnits.push({
    id: 'bot-msg-div-'+app.nMsgsBot,
    class: 'div-bot msg-unit-el',
    data: "Olá, processei sua queixa e encontrei "+app.resultUnits.length+" co-relações que podem te ajudar. Responda algumas perguntas para que eu possa lhe dar o melhor resultado :)"
  });
}
