// TODO: write api keys in comments (bootcampspot comments), gitignore keys
var fs = require("fs");

var utils   = require('./utils');
var keys    = require('./keys');
var imdb    = require('./imdb');
var tweets  = require('./tweets');
var songs   = require('./songs');

var twitterKey  = keys.twitter;
var spotifyKey  = keys.spotify;
var omdbKey     = keys.omdb;

var isDefault = false;

var action = process.argv[2];
var detail = process.argv[3];


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function isUndefined(item) {
  return typeof (item) === 'undefined';
}

function handleRandom() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (!err) {
      var actions   = data.trim().split(/\r?\n/),
          actionID  = getRandomInt(0, actions.length-1);

      var actionArr = actions[actionID].trim().split(',');

      utils.log('>> do-what-it-says\n');

      if (actionArr.length > 1) {
        actionHandler(actionArr[0], actionArr[1]);
      }
      else {
        actionHandler(actionArr[0]);  
      }
    }
    else {
      console.log('the error is: ', err);
    }
  });
}

function actionHandler(override, info) {
  
  if (isUndefined(override)) {
    override = action;
  }
  if (isUndefined(info)) {
    info = detail;
  }
  
  if (override === 'my-tweets') {
    utils.log('>> running ' + override );
    tweets.handle(twitterKey);
  }
  else if (override === 'spotify-this-song') {
    if (isUndefined(info) || info.trim() == '') {
      info = 'The Sign Ace of Base';
      // isDefault = true;
    }
    utils.log('>> running ' + override +' ' + info + '\n');
    songs.handle(spotifyKey, info);
  }
  // using fs, perform one random action
  else if (override === 'do-what-it-says') {
    handleRandom();
  }
  else if (override === 'movie-this') {
    if (isUndefined(info) || info.trim() == '') {
      info = 'Mr. Nobody';
    }
    utils.log('>> running ' + override +' ' + info + '\n');
    imdb.handle(omdbKey.key, info);
  }
  else {
    console.log('Sorry, unknown action', action);
  }
}

actionHandler();
