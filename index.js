// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api', function (req, res) {
  // timestamp is empty
  let date = new Date();
  res.json({ 'unix': date.getTime(), 'utc': date.toUTCString() });
})

app.get('/api/:timestamp', function (req, res) {
  let timestamp = req.params.timestamp;

  if (!isNaN(timestamp)) {
    timestamp = parseInt(timestamp);
  }

  let date = new Date(timestamp);

  if (date.toString() === 'Invalid Date') {
    res.json({'error': 'Invalid Date'});
  }

  res.json({ 'unix': date.getTime(), 'utc': date.toUTCString() });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
