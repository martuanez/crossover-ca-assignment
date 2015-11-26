var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var router = express.Router();              // get an instance of the express Router


var categoriesRoute = require('./server/routes/categories.route');
var postsRoute = require('./server/routes/posts.route');
var topicsRoute = require('./server/routes/topics.route');
var usersRoute = require('./server/routes/users.route');



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;        // set our port

app.get(/^(.*)$/, function (req, res, next) {
    if (req.path.indexOf('.') !== -1 || req.path.indexOf('api') !== -1) {
        next();
    } else {
        res.render('index', { url: req.path.split('/')[1] });
    }
});


var server = app.listen(port);
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

// ROUTES FOR OUR API
// =============================================================================

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    res.json({message: 'hooray! welcome to our api!'});
});

function res(method, name) {
    if(method === 'get'){
        return getFn;
    } else {
        return postFn;
    }
    function getFn(req, res) {
        io.emit('vb callback', emitText(name, method, req.query));
        res.json({'success': 'success'});
    }

    function postFn(req, res) {
        io.emit('vb callback', emitText(name, method, req.body));
        res.json({'success': 'success'});
    }
    function emitText(name, method, data){
        return name + '[' + method + ']: ' + JSON.stringify(data);
    }
}

// REGISTER OUR ROUTES -------------------------------
//Rest api
app.use('/api', categoriesRoute);
app.use('/api', postsRoute);
app.use('/api', topicsRoute);
app.use('/api', usersRoute);

//Frontend assets
app.use(express.static(__dirname + '/client'));

// views is directory for all template files
app.set('views', __dirname + '/server/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index');
});


// START THE SERVER
// =============================================================================
console.log('Magic happens on port ' + port);

