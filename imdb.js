
var request = require('request');

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
          actors = body["Actors"];

      console.log('---- Movie Info ----');
      console.log('name: ' + title);
      console.log('year: ' + year);
      console.log('omdb rating: ' + rating.imdb);
      console.log('rotten tomato rating: ' + rating.rt);
      console.log('countries: ' + countries);
      console.log('language: ' + language);
      console.log('plot: ' + plot);
      console.log('actors: ' + actors);
    }
    else {
      console.log('error:', error);
    }
  });
}

module.exports = {
  handle: handle  
}