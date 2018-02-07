const express = require('express');
const app = express();
const path = require('path');

port = process.env.PORT || 8080;

var DIST_DIR = path.join(__dirname, "/frontend/public");
app.use(express.static(DIST_DIR), function(){
  console.log(__dirname);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(port, function() {
  console.log("Goober. running on port", port);

});
