// TODO: write api keys in comments (bootcampspot comments), gitignore keys
// TODO: break away related functions into seperate files
// TODO: spotify default, make sure it's the default they mentioned
// TODO: QA each modules
var fs = require("fs");
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var moment = require('moment');

var keys = require('./keys');
var imdb = require('./imdb');

var twitterKey = keys.twitter;
var spotifyKey = keys.spotify;
var omdbKey = keys.omdb;

var action = process.argv[2];
var detail = process.argv[3];
// request to OMDB:  http://www.omdbapi.com


function parseTime(str) {
  var newMoment = moment(str, 'ddd MMM D HH:mm:ss Z GGGG');

  if (newMoment.isValid()) {
    return newMoment.format("ddd, h:mA");
  }
  else {
    return str;
  }
}

function handleTwitter() {
  var topTweets = [],
      twitterClient = new Twitter(twitterKey),
      params = {screen_name: 'afGroff', count: 20};

  twitterClient.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for(var i=0, j=tweets.length; i < j; i++) {
        console.log(parseTime(tweets[i].created_at) + ': ' + tweets[i].text);
      }
    }
    else {
      console.log('error is', error);
    }
  });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleRandom() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (!err) {
      var actions   = data.trim().split(/\r?\n/),
          actionID  = getRandomInt(0, actions.length);

      console.log('running: ', actions, actionID);

      actionHandler(actions[actionID]);
    }
    else {
      console.log('the error is: ', err);
    }
  });
}

// spotify-this-song
function handleSpotify() {
  var spotify = new Spotify(spotifyKey);

  console.log('typeof detail', typeof detail);
  if (typeof detail == 'undefined' || detail.trim() == '') {
    detail = 'The Sign';
  }

  spotify.search({ type: 'track', query: detail.trim(), limit : 1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      var albums = data.tracks.items;

      albums.forEach(function(album) {
        var artists = album.album.artists,
            previewURL = album.preview_url,
            albumName = album.album.name,
            artistNames = [];

        artists.forEach(function(artist) {
          artistNames.push(artist.name);
        });

        console.log('---- Song Info ----');
        console.log('song name: ' + detail.trim());
        console.log('artist(s): ', artistNames.join(','));
        console.log('album name: ' + albumName);
        console.log('preview url:\n' + previewURL);
        console.log('--------');
      });

      if (albums.length == 0) {
        console.log('Can\'t find your song!'); 
      }
    } 
  });
}

function actionHandler(override) {
  
  if (typeof override === 'undefined') {
    override = action;
  }

  // show your last 20 tweets and when they were created at in your terminal/bash window
  if (override === 'my-tweets') {
    handleTwitter();
  }
  else if (override === 'spotify-this-song') {
    handleSpotify();
  }
  // using fs, perform one random action
  else if (override === 'do-what-it-says') {
    handleRandom();
  }
  else if (override === 'movie-this') {
    if (typeof detail === 'undefined' || detail.trim() == '') {
      detail = 'Mr. Nobody';
    }
    imdb.handle(omdbKey.key, detail);
  }
  else {
    console.log('Sorry, unknown action', action);
  }
}


actionHandler();

/*

* `spotify-this-song`
 show the following information about the song in your terminal/bash window     
  * Artist(s)     
  * The song's name
  * A preview link of the song from Spotify
  * The album that the song is from
  * If no song is provided then your program will default to "The Sign" by Ace of Base.

* `movie-this`
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
  * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

* `do-what-it-says`
  * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

* BONUS
  * log everything, append and write to `log.txt`
*/

