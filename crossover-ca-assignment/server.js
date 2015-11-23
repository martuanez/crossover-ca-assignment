var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var router = express.Router();              // get an instance of the express Router

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

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


router.route('/uploaded')
    .get(res('get', 'uploaded'))
    .post(res('post', 'uploaded'));

router.route('/indexed')
    .get(res('get', 'indexed'))
    .post(res('post', 'indexed'));

router.route('/machine-ready')
    .get(res('get', 'machine-ready'))
    .post(res('post', 'machine-ready'));

router.route('/human-ready')
    .get(res('get', 'human-ready'))
    .post(res('post', 'human-ready'));

router.route('/error')
    .get(res('get', 'error'))
    .post(res('post', 'error'));

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
/*
 uploadedCallBack: getUrl('api/uploaded'),
 indexedCallBack: getUrl('api/indexed'),
 machineReadyCallBack: getUrl('api/machine-ready'),
 humanReadyCallBack: getUrl('api/human-ready'),
 errorCallBack: getUrl('api/error')
 */

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


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