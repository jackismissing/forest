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

/* EventDuino */
var eventduino = require('eventduino');
var ardy = new eventduino({ serialport: '/dev/tty.usbmodem411' });

ardy.on('get', function (args) {
  console.log("pin " + args[0] + " is set to " + args[1]);
});

ardy.on('init', function (args, comment) {
  console.log('Eventduino init version ' + comment);

  // set the LED pin to HIGH (1)
  ardy.set(13, 1);
	setTimeout(function() {
		ardy.set(13,0)
	}, 1000);
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

// app.get('/', tweetList.showTweets.bind(tweetList));
app.get('/', function(req, res) {
	res.render('tree');
});

/* SHOWTIME! */

console.log(c_main('[main]') + ' -- Application started');

var doBlink = function(entities) {
	hash = entities.hashtags;
	found = false;
	pinToBlink = 0;

	var blink = function(pin) {
		// console.log('pin:', pin);
		// Blink the pin
		ardy.set(pin,1);
		timer = setTimeout(function() {
			ardy.set(pin,0);
		}, 500);
		// clearTimeout(timer);
	};

	blink(12);
	// Found the hashtag used
	/*
	for(var i = 0; i < hash.length; i++) {
		// console.log("testing hash");
		if(!found) {
			if( hash[i].text == "jpogobelins" ) {
				// console.log("[tweet] #jpogobelins");
				// pinToBlink = 11;
				blink(12);
				found = true;
			}
		}
		else {
			blink(pinToBlink);
		}
 	} */
}

/* Twitter - Get followers ids */

/* SOCKETS */
io.sockets.on('connection', function( socket ) {
	console.log( c_socket('[socket]') + ' connection ');
	socket.emit('You are connected ! ');

	/* Detect room */
	socket.on('channel', function( room ) {
		console.log( c_socket('[socket]') + ' room request ' + room);
		socket.emit('You are in room : ', room);
		socket.join(room);
	});
});

//twit.stream('statuses/filter', {'track':'#jpogobelins, #goblins'}, function( stream ) {
// twit.stream('statuses/filter', {'track':'#gobelins,#jpogobelins,#jpo2013gobelins'}, function( stream ) {
twit.stream('statuses/filter', {'track':'#ps4'}, function( stream ) {
	/* on data */
	stream.on('data',function( data ){
		console.log(c_main('[main]') +'['+data.created_at+'] '+ c_socket('@'+data.user.screen_name)+'  '+data.text+ ' [#'+data.id_str+']');
		doBlink(data.entities);

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

