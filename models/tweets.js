// Mongo 
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var TweetSchema = new Schema({
	tweet_id      	: String,
	screen_name		: String,
	text  			: String,
	retweeted		: { type: Boolean, default: false },
	created_at      : { type: Date, default: Date.now },
});


module.exports = mongoose.model('TweetModel', TweetSchema);