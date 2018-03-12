const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/goober';
const mongoTestURI = 'mongodb://localhost/test';
mongoose.Promise = global.Promise;

// tests will use NODE_ENV=test
if(process.env.NODE_ENV == 'test'){
  connectToDB(mongoTestURI);
}
else {
  connectToDB(mongoURI);
}

const Goo = require('./models/Goo');
const User = require('./models/User');
var db_wrapper = {}; // wrapper for database module

db_wrapper.connectToDB = connectToDB;
db_wrapper.Goo = Goo;
db_wrapper.User = User;

db_wrapper.ObjectId = mongoose.Types.ObjectId;

module.exports = db_wrapper;

function connectToDB(url) {
  mongoose.connect(url, function(err){
      if(err){
         throw new Error(err);
      }
  });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'mongoose connection error:'));
  db.once('open', function(){
    console.log("Connected to mongodb on", url);
  });
  return db;
}
function disconnectDB(){
    db.close()
}
