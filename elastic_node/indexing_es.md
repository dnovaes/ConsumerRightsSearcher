# Indexing the elastic search using the web system

Not just indexing, in this web system we can make some request to
the local elastic search engine like:
search, delete documents, show count of indexed documents, create and delete indexes.

To start the web system, it's necessary to have 'cdc' documents indexed. you can find those documents in the source/texts/cdc_en/ folder of this project.
Taking account that you are at 'elastic_node' folder Execute the following code to index all the documents in there.
```
node controller/createDocsFromDirectory.js ../source/texts/cdc_en/
```

you will probably see a msg of sucess after indexing the documents. You wanna check how many documents are indexed. Probably 25. execute:
```
node controller/infoCount.js
``` 
And you will see "count" as value 25 and shards with a total of 5.

# Deleting an whole index

All the functions in this websystem that request commands to the elasticsearch.js API are inside of controller folder.
The function of removing the whole index document is called deleteIndex.js. pass the name of the index you would like to remove from elasticsearch as a argument.

The example below, cdc is the name of the index i previously indexed.
```
node controller/deleteIndex cdc
```

after that u should a message like this:

"Request complete
delete {acknowledged: true}"

# Show how many documents are indexed in your elasticsearch

```
node controller/infoCount.js
```

a message like this should appear when sucess:


