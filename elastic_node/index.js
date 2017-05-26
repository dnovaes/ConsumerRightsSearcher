//4919415
// BASE SETUP 

var express    = require('express')
var app        = express()
var path       = require('path');
var bodyparser = require('body-parser');
var port       = process.env.PORT || 8081;

// There is a special routing method which is not derived from any HTTP method. 
// This method is used for loading middleware functions at a path for all request methods.
// app.all()

//set our default template engine to "ejs"
// which prevents the need for using file extensions. (pug, ejs...)
app.set('view engine', 'ejs');

//set views for 505, 404 and other view pages
app.set('views', path.join(__dirname, 'views'));

//set path for static files (css, images...)
app.use(express.static(path.join(__dirname, 'public')));

//parse request bodies (req.body / POST )
app.use(bodyparser.urlencoded({ extended: true}));

//load file of route configs | also called as controllers
//require('./controller/routing.js')(app, { verbose: !module.parent, express: express });

var router = express.Router();

router.get('/', function (req, res){
  res.render('index');
});

// route with parameters ex: localhost:8081/elastic/:id
router.get('/elastic/:id', function(req, res){
    var routePath = "Route path: "+req.originalUrl;
    var fullUrl = "Request URL: "+ "http://"+req.hostname+":"+port+req.originalUrl;

    // body content
    var body = "<p>"+routePath+"</p>";
    body+= "<p>"+fullUrl+"</p>";
    body+= "<p>Params: "+JSON.stringify(req.params)+"</p>";

    res.send(body);
    
    //other alternatives at sending content to client
    
    //res.write();
    //res.end
    //or
    //res.set('Content-Type', 'text/html');
    //res.send(...);
});

//validation of a param
//router.param('name', function

router.get('/:viewname', function (req, res){
    //res.render('default', { viewname: req.params.viewname+req.query.color });
    res.render('default', { viewname: req.params.viewname});
});

//router contain functions that not allow the request to go beyound it (res.send)
app.use('/', router);

app.use('/public', express.static(__dirname + '/public'));


//ERRORS:
//mount the app requests with the functions
app.use(function (err, req, res, next){
    //log it
    if (!module.parent) console.error(err.stack);

    //error page
    res.status(500).render('5xx');
});

//last middleware response: 404 page error
app.use(function(req, res, next){
    res.status(404).render('404', { url: req.originalUrl });
});

// START THE SERVER
if(!module.parent) {
  app.listen(port);
  console.log("Server started at the port: "+port);
}
