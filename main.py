# -*- coding: utf-8 -*-

import nltk;
from lib.functions import *
from urllib import request

url= "./source/texts/claim1.txt"

# for urls:
# response = request.urlopen(url)
# raw = response.read().decode('utf8')

def start():
    f = open(url)
    raw = f.read()

    # type(raw)
    # print(raw)

    # tokenize the sentences

    raw = "she eat a cake."
    #tokenizer punkt package
    tokens = nltk.word_tokenize(raw)
    #print(tokens)

    #pos_tagger
    # averaged_perceptron_tagger
    tagged = nltk.pos_tag(tokens)
    print(tagged)

    extract_relations(tagged)

if __name__ == '__main__':
    start()
