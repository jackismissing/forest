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
		// socket.join('client', function() {
		// 	console.log('[socket] asked to join channel client');
		// });

	});
	socket.on('connect_failed', function() {
		console.log('[socket] lost connectiong');
	});

	/* Manage twitter */
	socket.on('tree', function(data) {
		console.log('[tree] : new tree!');
		/* Add processing drawTree call() */
		// Processing.getInstanceById('processing-canvas').growTree();
		createATree(data);
	});

	socket.on('trees', function(data) {
		console.log('[trees] : whole lot of trees!');
		/* Add processing drawTree call() */
		for(i = 0; i < data.length; i++) {
			createATree(data[i]);
		}

	});

}

var treeNumber = 1;
var createATree = function(data) {
	Processing.getInstanceById('processing-canvas').growTree(treeNumber);

	if(data.screen_name === undefined)
		username = data.user.screen_name;
	else
		username = data.screen_name


	$('.last-tweet span').fadeOut(500, function() {
        $(this).text('@'+ username + ' : ' + data.text + '   ['+data.created_at+']').fadeIn(500);
    });
    treeNumber++;
};

/* Unusable at this time */
/**
 * function errorSocket()
 * @desc Return error if socket(url) cannot be found
 * @return void
 */
function errorSocket() {
	console.log('[socket] Error: Could not load socket, nodejs server is down ?');
}