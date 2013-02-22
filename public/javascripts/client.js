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
		Processing.getInstanceById('processing-canvas').growTree();

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