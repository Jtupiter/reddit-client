var express = require('express');
var http = require('http');
var config = require('konphyg')('config');
var reddit = config('reddit');
var httpConfig = config('httpConfig');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

// Type is of the form "new" or "hot"
app.get('/r/:subreddit/:type', function(req, res) {
  var redditPath = reddit.baseUrl + req.params.subreddit + '/' + req.params.type + '.json';
  if (req.query.after) {
    redditPath += "?after=" + req.query.after;
  }
  console.log(redditPath);
  request.get(redditPath, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      // Reddit API returns data in the 'data' attribute
      var data = JSON.parse(body).data;
      res.send(data);
    } else {
      console.log(error);
      console.log("Status Code: " + response.statusCode);
      res.send(response.statusCode);
    }
  });
});

http.createServer(app).listen(httpConfig.port, function() {
  console.log('Reddit Client started listening on port ' + httpConfig.port);
});