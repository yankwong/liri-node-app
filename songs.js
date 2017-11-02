var Spotify = require('node-spotify-api');
var utils   = require('./utils');

function handle(key, detail) {
  var spotify = new Spotify(key);

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
            artistNames = [],
            printResult = '';

        artists.forEach(function(artist) {
          artistNames.push(artist.name);
        });

        printResult += '---- Song Info ----\n';
        printResult += 'song name: ' + detail.trim() + '\n';
        printResult += 'artist(s): ' + artistNames.join(',') + '\n';
        printResult += 'album name: ' + albumName + '\n';
        printResult += 'preview url:\n' + previewURL + '\n';
        printResult += '--------' + '\n';

        console.log(printResult);
        utils.log(printResult);
      });

      if (albums.length == 0) {
        console.log('Can\'t find your song!'); 
        utils.log('Can\'t find your song!');
      }
    } 
  });
}

module.exports = {
  handle: handle 
}