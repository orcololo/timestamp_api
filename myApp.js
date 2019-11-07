var express = require("express");
var app = express();
var bodyParser = require("body-parser");

console.log("Hello World");

app.use(function(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip + " - " + req.url);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, function(req, res) {
  res.json({
    time: req.time
  });
});

app.get("/json", function(req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: "HELLO JSON"
    });
  }
  res.json({
    message: "Hello json"
  });
});

app.get("/:word/echo", function(req, res) {
  res.json({
    echo: req.params.word
  });
});

app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({
    name: string
  });
});

app.use(express.static(__dirname + "/public"));

/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

/** 8) Chaining middleware. A Time server */

/** 9)  Get input from client - Route parameters */

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

/** 12) Get data form POST  */

// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

module.exports = app;
