# -*- coding: utf-8 -*-

p = print

def extract_relations(taggedSentence):
    #print(len(sentence_tagged[0]))
    nWords = len(taggedSentence)
    i=0
    while taggedSentence[i][1] != 'VBD':
        i+=1
    if i != nWords:
        p("we found a verb: %s" % taggedSentence[i][0])
        #find a suject for the action / predicate, returns the index-word of the sentence
        i_subj = lookForSubject(i, taggedSentence)
        p("found in position %d" % i_subj)
        if i_subj == -1:
            # hidden subject: its 'me' or hidden third person like (it): "Choveu ontem / It rained yesterday"
            subj = "hidden subject"
        else:
            subj = taggedSentence[i_subj][0]

        #find a object for the action / predicate, returns the index-word of the sentence
        i_obj = lookForObject(i, taggedSentence)
        if i_obj == -1:
            # hidden object: previous citation or reflexive sentence.  "Eles foram levados".
            # more situations ?
            obj = "hidden subject"
        else:
            obj = taggedSentence[i_obj][0]

        #print information extracted
        p("%s(%s, %s)" % (taggedSentence[i][0], subj, obj ))

#    for word in sentence_tagged:
#        if word[1] == 'VBD':
#            p("we found a verb: %s" % word[0])

#find a suject for the action / predicate, returns the index-word of the sentence
def lookForSubject(i_start, taggedSentence):

    for i in range(i_start, -1, -1):
        p("checking i pos: %d" % i)
        #look for nouns, entities, pronouns
        if isSubject(taggedSentence[i][1]):
            return i
    return -1


#find a object for the action / predicate, returns the index-word of the sentence
def lookForObject(i_start, taggedSentence):

    nWords = len(taggedSentence)

    for i in range(i_start, nWords, 1):
        #look for nouns, entities, pronouns
        if isObject(taggedSentence[i][1]):
            return i
    return -1

def isSubject(wordType):
    p("%s == 'PRP' ?" % wordType)
    if wordType == 'PRP':
        p('yes')
        return 1
    else:
        p('no')
        return 0

def isObject(wordType):
    if wordType == 'NN':
        return 1
    else:
        return 0



