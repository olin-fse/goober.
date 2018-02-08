const mongoose = require('mongoose');

var database = {}; // wrapper for databse module
database.connecToDB = connectToDB;

function connectToDB(url) {
  mongoose.connect(url);
  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'mongoose connection error:'));
  db.once('open', function(){
    console.log("Connected to mongodb on", url);
  });
}

module.exports = database;
