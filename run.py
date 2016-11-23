# -*- coding: utf-8 -*-

import nltk;
from urllib import request

url= "./source/texts/claim1.txt"

# for urls: 
#response = request.urlopen(url)
#raw = response.read().decode('utf8')

f = open(url)
raw = f.read()

type(raw)
print(raw)

# tokenize the sentences
tokens = nltk.word_tokenize(raw)
print(tokens)

