var Twitter = require('twitter');
var utils = require('./utils');

function handle(key) {
  var topTweets = [],
      twitterClient = new Twitter(key),
      params = {screen_name: 'afGroff', count: 20};

  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i=0, j=tweets.length; i < j; i++) {
        var printResult = utils.parseTime(tweets[i].created_at) + ': ' + tweets[i].text;
        console.log(printResult);
        utils.log(printResult + '\n');
      }
    }
    else {
      console.log('error is', error);
      utils.log('error is', error);
    }
  });
}

module.exports = {
  handle: handle 
}