const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/goober';
mongoose.Promise = global.Promise;

connectToDB(mongoURI);

const Goo = require('./models/Goo');
var db_wrapper = {}; // wrapper for database module

db_wrapper.connecToDB = connectToDB;
db_wrapper.Goo = Goo;

module.exports = db_wrapper;

function connectToDB(url) {
  mongoose.connect(url);
  let db = mongoose.connection;

  db.on('error', console.error.bind(console, 'mongoose connection error:'));
  db.once('open', function(){
    console.log("Connected to mongodb on", url);
  });
}
