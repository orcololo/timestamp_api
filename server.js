// server.js
// where your node app starts

// init project
var moment = require('moment');
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/timestamp', function (req, res) {
  res.json({
    unix: Math.floor(Date.now() / 1000),
    utc: Date()
  })
});

app.get("/api/timestamp/:ts", function(req, res) {
  var time = req.params.ts;
  var unixTime = moment(time).unix();
  if (moment(time).isValid()) {
    var utcTime = moment(time).format("ddd, DD MMMM YYYY HH:mm:ss ");
      res.json({
    unix: unixTime,
    utc: utcTime + 'GMT'
  });
  } else {
    res.json({
      unix: unixTime,
      utc: "Invalid Date"
    })
  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});