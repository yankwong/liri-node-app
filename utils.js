var moment = require('moment');
var fs = require("fs");

function parseTime(str) {
  var timeArr = str.split('+0000');
  var newMoment = moment(timeArr[0], 'ddd MMM DD HH:mm:ss');

  if (newMoment.isValid()) {
    return newMoment.subtract(7, 'hours').format("ddd, hh:mmA");
  }
  else {
    return str;
  }
}

function writeLog(str) {
  fs.appendFile("log.txt", str + '\n', function(err) {
  });
}

module.exports = {
  parseTime: parseTime,
  log: writeLog,
}