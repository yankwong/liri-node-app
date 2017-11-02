var moment = require('moment');
var fs = require("fs");

function parseTime(str) {
  var newMoment = moment(str, 'ddd MMM D HH:mm:ss Z GGGG');

  if (newMoment.isValid()) {
    return newMoment.format("ddd, h:mA");
  }
  else {
    return str;
  }
}

function writeLog(str) {
  fs.appendFile("log.txt", str, function(err) {
  });
}

module.exports = {
  parseTime: parseTime,
  log: writeLog,
}