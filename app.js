const express = require('express');
const app = express();
const path = require('path');
const db = require('./db_wrapper');
const bodyParser = require('body-parser');

const DIST_DIR = path.join(__dirname, 'frontend/public');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
// parse application/json
app.use(bodyParser.json())

app.route('/goos')
  .get(function (req, res){
    db.Goo.getGoos().then(function (goos) {
      res.send(goos);
    })
  })
  .post(function (req, res) {
    var goo = {
      title:       req.body.title,
      location:    req.body.location,
      description: req.body.description,
      startDate:   req.body.startDate,
      endDate:     req.body.endDate,
      tags:        req.body.tags,
      people:      req.body.people,
      maxPeople:   req.body.maxPeople,
    };
    db.Goo.saveGoo(goo).then(function(gooData) {
      res.status(200).send("new Goo was saved succesfully");
    }, function error(err) {
      res.status(500).send(err);
    });
});

app.use(express.static(DIST_DIR));

// this allows app to serve api specific json
app.get('/api*', function (req, res) {
  res.send('api');
});

// app.get('/') will mess up react-router settings
app.get('*', function (req, res) {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

module.exports = app;
