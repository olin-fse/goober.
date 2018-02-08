const port = process.env.PORT || 8080;

const app = require('./app');
const db =  require('./database');

app.listen(port, function() {
  console.log("Goober. running on port", port);
});
