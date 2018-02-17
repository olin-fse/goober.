const express = require('express');
const app = express();
const path = require('path');
const db = require('./db_wrapper');
const bodyParser = require('body-parser');

const DIST_DIR = path.join(__dirname, 'frontend/public');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())

const api = require('./routes/api')(db);
app.use('/', api);

app.use(express.static(DIST_DIR));

// app.get('/') will mess up react-router settings
app.get('*', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

module.exports = app;
