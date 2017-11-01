// not included in .gitignore for easy code review
// should not do that in production

var twitterKeys = {
  consumer_key: 'OGFDHjPSEV0GAc7iCYAvngAp0',
  consumer_secret: 'EXE7DHXSsRQU0vYoAxlnCtDaxPmw7c57KDNSnzXCdT6g66Rovx',
  access_token_key: '924779557554499584-HeB5IkDu1IkMjB2nMVS3yfxv6zCu7pJ',
  access_token_secret: 'aSoIhkC14noKlGylgO3KH37Nbjqf9LGBJMJ6fRcv9VG2m',
}

var spotifyKeys = {
  id: '155e142bc0cc49f18d87d991019da84b',
  secret: '69e26e1298b14d6faec79fb217ac8fc7',
}

var omdbKeys = {
  key: '40e9cece'
}

module.exports = {
  twitter: twitterKeys,
  spotify: spotifyKeys,
  omdb: omdbKeys,
}