const port = process.env.PORT || 8080;
const app = require('./app');

app.listen(port, function() {
  console.log("Goober. running on port", port);
});
