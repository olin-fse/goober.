const port = process.env.PORT || 8080;
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/goober';
const app = require('./app');
const db =  require('./database');

db.connecToDB(mongoURI);

app.listen(port, function() {
  console.log("Goober. running on port", port);
});
