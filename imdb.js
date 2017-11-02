
var request = require('request');
var utils   = require('./utils');

function makeURL(key, title) {
  console.log('wahast', 'http://www.omdbapi.com/?apikey=' + key + '&t=' + encodeURI(title) + '&type=movie');
  return 'http://www.omdbapi.com/?apikey=' + key + '&t=' + encodeURI(title) + '&type=movie';
}

function paseRating(ratingArr) {
  var rateObj = {
    imdb: 'N/A',
    rt  : 'N/A',
  };

  ratingArr.forEach(function(rating) {
    if (rating.Source == 'Internet Movie Database') {
      rateObj.imdb = rating.Value;
    }
    if (rating.Source == 'Rotten Tomatoes') {
      rateObj.rt = rating.Value;
    }
  });

  return rateObj;
}


function handle(key, title) {
  request(makeURL(key, title), function (error, response, body) {
    if (!error) {
      
      body = JSON.parse(body);

      var year = body["Year"],
          rating = paseRating(body["Ratings"]),
          countries = body["Country"],
          language = body["Language"],
          plot = body["Plot"],
          actors = body["Actors"],
          printResult = '';

      printResult += '---- Movie Info ----\n';
      printResult += 'name: ' + title + '\n';
      printResult += 'year: ' + year + '\n';
      printResult += 'imdb rating: ' + rating.imdb + '\n';
      printResult += 'rotten tomato rating: ' + rating.rt + '\n';
      printResult += 'countries: ' + countries + '\n';
      printResult += 'language: ' + language + '\n';
      printResult += 'plot: ' + plot + '\n';
      printResult += 'actors: ' + actors + '\n';
      
      console.log(printResult);
      utils.log(printResult);
    }
    else {
      console.log('error:', error);
      utils.log('error:', error);
    }
  });
}

module.exports = {
  handle: handle 
}