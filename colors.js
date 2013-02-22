clc = require('cli-color');
/* CLI Colors  - Because its quite easier to colorize output :) */
module.exports = function(s){

	error: function (s) {
		clc.black.bgRed.bold
	},
	warn: function (s) {
		clc.black.bgYellow;
	},
	notice: function (s) {
		clc.white.bgBlue;
	},
	status: notice(s),
	save: function (s) {
		clc.black.bgGreen;
	},
	model: function (s) {
		clc.magenta;
	},
	server: function (s) {
		clc.red;
	},
	rest: function (s) {
		clc.cyan;
	},
	socket: rest(s),
	main: function (s) {
		clc.black.bgWhite;
	},
	stream: main(s)
};