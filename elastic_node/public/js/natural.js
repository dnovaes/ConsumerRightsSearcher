var natural   = require("natural");
var path      = require("path");

var lib = {
  //words = words from the claim
  posTagger: function (words){
    var base_folder = path.join(path.dirname(require.resolve("natural")), "brill_pos_tagger");
    var rulesFilename = base_folder + "/data/English/tr_from_posjs.txt";
    var lexiconFilename = base_folder + "/data/English/lexicon_from_posjs.json";
    var defaultCategory = 'N';

    var lexicon = new natural.Lexicon(lexiconFilename, defaultCategory);
    var rules = new natural.RuleSet(rulesFilename);
    var tagger = new natural.BrillPOSTagger(lexicon, rules);

    //var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
    return JSON.stringify(tagger.tag(words));
  }
}

module.exports = lib;
