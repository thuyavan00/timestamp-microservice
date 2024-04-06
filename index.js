// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/:date', (req, res) => {
  const dateString = req.params.date;

  // Check if the date string is a valid Unix timestamp
  const unixTimestampRegex = /^\d{13}$/; // Unix timestamp has 13 digits
  if (unixTimestampRegex.test(dateString)) {
    const unixTimestamp = parseInt(dateString);

    // Convert Unix timestamp to Date object
    const date = new Date(unixTimestamp);

    // Generate UTC formatted date string
    const utcString = date.toUTCString();

    // Return the Unix timestamp and UTC formatted date string
    return res.json({ unix: unixTimestamp, utc: utcString });
  }

  // Parse the date string into a JavaScript Date object
  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid date' });
  }

  // Get the UTC formatted date string
  const utcString = date.toUTCString();

  // Return the UTC formatted date string as a JSON object
  res.json({ unix: date.getTime(), utc: utcString });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
