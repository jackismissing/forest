/**
 * app.js
 * NodeJS + Twitter API + MongoDB
 * #ENMI12 - Zombie Game
 * zombie.cdnl.me
**/

/* Modules */
var express = require('express'),
	sys = require('sys'),
	http = require('http'),
	path = require('path'),
	jade = require('jade'),
	twitter = require('ntwitter'),
	fs = require('fs'),
	clc = require('cli-color'),
	settings = require('./config.js');

/* CLI Colors  - Because its quite easier to colorize output :) */
var c_error = clc.black.bgRed.bold;
var c_warn = clc.black.bgYellow;
var c_status = c_notice = clc.white.bgBlue;
var c_save = clc.black.bgGreen;
var c_model = clc.magenta;
var c_server = clc.red;
var c_socket = c_rest = clc.cyan;
var c_stream = c_main = clc.black.bgWhite;

/* HTTP Logfile */
var logFile = fs.createWriteStream('./server.log', {flags: 'a'}); //use {flags: 'w'} to open in write mode

/* Twitter - Configuration (API Keys) */
var twit = new twitter({
	consumer_key: settings.consumer_key,
	consumer_secret: settings.consumer_secret,
	access_token_key: settings.access_token_key,
	access_token_secret: settings.access_token_secret
});


/* Express - Useful Methods */
function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', { error: err });
}

function auth(user, pass) {
	console.log(c_server('[admin]') + ' ASKED ');
}

function authorized(req, res) {
	console.log(c_server('[admin]') +' ALLOWED ' + req.connection.remoteAddress);
	// res.end('authorized!');
}

/* Express - Configuration */
var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3002);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', { layout: false });
	app.use(express.favicon());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.logger({stream: logFile}))
	app.use(express.errorHandler());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});


/* Database */
var server = http.createServer(app).listen(app.get('port'), function() {
	console.log(c_server('[server]') + " Express server listening on port " + app.get('port'));
});

/* Socket - DEBUG MODE ACTIVATED */
var io  = require('socket.io').listen(server, { log: true});
io.set('log level', 1);

/* Database & Models - MongoDB + Mangoose \o/ - even if I prefer otters. Or meerkats. Meerkats are awesome dude! */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jpogobelins');

var Tweets = require('./routes/tweets');
var tweets = new Tweets();

/* SOCKETS */
io.sockets.on('connection', function( socket ) {
	console.log( c_socket('[socket]') + ' connection ');
	socket.emit('You are connected ! ');
	
	// We load all the trees after 5s
	setTimeout(doSendTrees, 5000);

	/* Detect room */
	socket.on('channel', function( room ) {
		console.log( c_socket('[socket]') + ' room request ' + room);
		socket.emit('You are in room : ', room);
		socket.join(room);

	});
});

// app.get('/', tweetList.showTweets.bind(tweetList));
app.get('/', function(req, res) {
	res.render('tree');
});

/* SHOWTIME! */

console.log(c_main('[main]') + ' -- Application started');

var doSendTrees = function(items) {
	console.log('doSendTrees called()');
	trees = tweets.getAllTrees(function(items) {
		console.log('got all trees!');
		io.sockets.emit('trees', items);
	});
}

/* Twitter - Get followers ids */


 twit.stream('statuses/filter', {'track':'#gobelins,#jpogobelins,#jpo2013gobelins'}, function( stream ) {
	/* on data */
	stream.on('data',function( data ){
		console.log(c_main('[main]') +'['+data.created_at+'] '+ c_socket('@'+data.user.screen_name)+'  '+data.text+ ' [#'+data.id_str+']');

		// add tweet to db
		tweets.addTweet( data, function( tweet_id ) {
			console.log(c_rest('[tweet]') + ' Adding tweet with tweet_id ', tweet_id);
		});

		// send to socket
		io.sockets.emit('tree', data);

	});

	/* on end */
	stream.on('end', function (response) {
		// Handle a disconnection
		console.log(c_stream('[stream]') +' Twitter stream end');
	});

	/* on destroy */
	stream.on('destroy', function (response) {
		// Handle a 'silent' disconnection from Twitter, no end/error event fired
		console.log(c_stream('[stream]') +' Twitter stream disconnect');
	});
});

