/* client.js */
 console.log('# client.js loaded');
 var url = '/socket.io/socket.io.js';

 $.ajax({
	url: url,
	dataType: 'script',
	success: startSocket,
	error: errorSocket
});

/**
 * function startSocket()
 * @desc Create and manage socket
 * @return void
 */
function startSocket() {
	/* Create socket */
	var socket = io.connect();

	/* Get some output */
	socket.on('connecting', function() {
		console.log('[socket] connecting');
	});
	socket.on('connect', function() { 
		console.log('[socket] connected'); 

	});
	socket.on('connect_failed', function() {
		console.log('[socket] lost connectiong');
	});

	/* Manage twitter */
	socket.on('twitter', function(data) {
		console.log('[tweet] :', data);

		var replacePattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		var replacedText = (data.text).replace(replacePattern, '<a href="$1" target="_blank">$1</a>');
		$("<li></li>").html("<div class=\"g\"><div class=\"c1\">[" + data.user.screen_name + "]</div> <div class=\"c2\">▸</div> " + "<div class=\"c3\"><font color=\"red\">" + replacedText + "</font></div></div>")
		.prependTo("ul#tweets")
		.css({opacity:0}).slideDown("slow").animate({opacity:1},"slow");


		/*
		twitter_uid      : Int,
		twitter_screen_name  : String,
		twitter_profile_img_url : String,
		twitter_name  : String, */
	});

	/* Survivors */
	socket.on('survivors', function(data) {
		console.log('[survivors]',data);
	});

	console.log(socket);



	socket.on('survivor', function(data) {
		console.log('[survivor]',data);
	});

	/* Zombies */
	socket.on('zombies', function(data) {
		console.log('[zombies]',data);
	});

	socket.on('zombie', function(data) {
		console.log('[zombie]',data);
	});
	
	socket.on('questions', function(data) {
		console.log('[currentQuestion]',data);
	});
}

/* Unusable at this time */
/**
 * function errorSocket()
 * @desc Return error if socket(url) cannot be found
 * @return void
 */
function errorSocket() {
	console.log('[socket] Error: Could not load socket, nodejs server is down ?');
}