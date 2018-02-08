const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/goober';

connectToDB(mongoURI);

var database = {}; // wrapper for databse module
database.connecToDB = connectToDB;
module.exports = database;

function connectToDB(url) {
  mongoose.connect(url);
  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'mongoose connection error:'));
  db.once('open', function(){
    console.log("Connected to mongodb on", url);
  });
}
