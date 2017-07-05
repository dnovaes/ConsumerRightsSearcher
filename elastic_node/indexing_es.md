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
