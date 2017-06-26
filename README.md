# Siri-Law-Br

## Requirements:

* python 3.5.2
* nltk 3.0
* nlpnet-1.2.1

keep pip upgraded. (last version used: pip 8.1.2-1)
```
$ pip install -U pip
```


## Nltk installation:

```
$ sudo pip install -U nltk
```

## Nlpnet installation:
````
$ pip install setuptools
````
Close and reopen terminal then type:
````
$ pip install numpy
$ pip install nlpnet
````

Added elasticSearch to the project... but still testing. Soon ill release some info here.

# WebSystem using Elastic Search 
-> with nodejs API to comunicate with the elasticsearch

Instalation of the websystem as a archlinux 
(general instructions, also applies for other linux alike systems)

install npm
```pacman -S npm```

install nodeversion manager to install node 6.11.0. Should work with version above too
for more info about the node version manager: github.com/tj/n
```npm install -g n```

install node 6.11.0
```n 6.11.0```

check if version was installed by typing 'n' at your terminal
```n```

## Running the websystem

Go to the folder elastic_node
```cd ./Siri-Law-Br/elastic_node```

Run the server
```node index.js```

server will start at the port localhost:8081 as default
now just open the address at your browser (localhost:8081). When typing anything at the search field, make sure that u have internet connection and your local elasticsearch is running.


Initial screen with a output example of

![Image of Initial System](./elastic_node/public/imgs/screen_after_search_elasticsearch.png)
