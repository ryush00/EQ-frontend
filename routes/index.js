var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var tweetSchema = mongoose.Schema({
    tweet_id: String,
    user_id: Number,
    user_name: String,
    user_screen_name: String,
    text: String,
    loc: {
        type: { type: String },
        coordinates: []
    },
    place: String,
    type: String,
    tweeted_at: Date,
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

var Tweet = mongoose.model('Tweet', tweetSchema);
tweetSchema.index({ "loc": "2dsphere" });




router.get('/tweets', function(req, res, next) {
    var q = Tweet.find().sort({'tweeted_at': -1, 'created_at': -1}).limit(500);
    q.exec(function ( err, tweets, count) {
        res.render('tweets', { title: '최근 지진 트윗 - EQ 지진 알리미', tweets: tweets});
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EQ 지진 알리미' });
});

module.exports = router;
