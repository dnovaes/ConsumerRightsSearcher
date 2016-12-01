# -*- coding: utf-8 -*-

p = print

def extract_relations(sentence_tagged):
    #print(len(sentence_tagged[0]))
    nWords = len(sentence_tagged)
    i=0
    while sentence_tagged[i][1] != 'VBD':
        i+=1
    if i != nWords:
        p("we found a verb: %s" % sentence_tagged[i][0])


#    for word in sentence_tagged:
#        if word[1] == 'VBD':
#            p("we found a verb: %s" % word[0])




