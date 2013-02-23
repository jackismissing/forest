var mongoose = require('mongoose'),
	tweet = require('../models/tweets.js');

module.exports = Tweets;

function Tweets() {}

/* Model Prototype */
Tweets.prototype = {

	/**
	 * Used in BackOffice - renders jade templates with saved tweets
	 * @param  {object} req app.req
	 * @param  {object} res app.res
	 * @return {function}     Return Jade render
	 */
	showTweets: function(req, res) {
		tweet.find().sort({_id : 'desc'}).exec(function foundTweets(err, items) {
			console.log("\u001b[35m[model]\u001b[0m TWEET: showTweets() called : ");

			res.render('admin/tweet', {title: 'Admin - Tweets', tweets: items});

		});
	},



	/**
	 * add tweet to the game
	 * @param {array}   data     Tweet data from syncData
	 * @param {Function} callback generic callback
	 */
	addTweet: function( data, callback) {
		console.log("\u001b[35m[model]\u001b[0m TWEET: addTweet() called : ", data.user.screen_name);

		tweet.count({}, function( err, count){
			/* Count Tweets */
    		console.log( "\u001b[35m[model]\u001b[0m TWEET: Tweets Total:", count );

    		/* Add */
			var item = data;
			newTweet = new tweet();

			newTweet.tweet_id = item.id;
			newTweet.screen_name = item.user.screen_name;
			newTweet.text = item.text;
			newTweet.retweeted = item.retweeted;
			newTweet.created_at = item.created_at;


			newTweet.save(function savedTweet(err, doc){
				if(err) {
					throw err;
				}
				console.log("\u001b[35m[model]\u001b[0m\u001b[42m\u001b[30m[SAVED]\u001b[0m addTweet() saved : ", doc._id, doc.screen_name);

				// Callback
				typeof callback === 'function' && callback(doc._id);
				return this;
			});
		});
	},

	getAllTrees: function(callback) {
		tweet.find().sort({_id : 'desc'}).exec(function foundTweets(err, items) {
			// console.log("\u001b[35m[model]\u001b[0m TREES: getallTrees() called : ", items);

			// Callback
			typeof callback === 'function' && callback(items);
			return this;
		});
	},

}