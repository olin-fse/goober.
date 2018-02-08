const express = require('express');
const app = express();
const path = require('path');

const DIST_DIR = path.join(__dirname, "/frontend/public");

app.use(express.static(DIST_DIR), function(){
  console.log(__dirname);
});

app.get('/', function (req, res) {
  res.status(200).send('Hello!')
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

module.exports = app;
