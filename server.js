const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/goober';
const port = process.env.PORT || 8080;
const DIST_DIR = path.join(__dirname, "/frontend/public");

connectToDB(mongoURI);

app.use(express.static(DIST_DIR), function(){
  console.log(__dirname);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(port, function() {
  console.log("Goober. running on port", port);
});


function connectToDB(url) {
  mongoose.connect(url);
  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'mongoose connection error:'));
  db.once('open', function(){
    console.log("Connected to mongodb on", url);
  });
}
