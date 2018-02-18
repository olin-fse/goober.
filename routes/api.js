const path = require('path');
const express = require('express');
var router = express.Router();

module.exports = function (db){
  router.route('/api*')
    .get(function(req, res){
      res.send('api');
    })
  router.route('/goo/:gooid')
    .delete(deleteGoo)

  router.route('/goos')
    .get(getAllGoos)
    .post(createGoo);

  function getAllGoos(req, res){
    db.Goo.getGoos().then(function (goos) {
      res.send(goos);
    });
  }

  function createGoo(req, res){
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
  }
  function deleteGoo(req, res){
    console.log(req);
    db.Goo.deleteGoo(db.ObjectId(req.params.gooid)).then(function success(data) {
      res.send('DELETE request to homepage');
    }, function error(err) {
      res.status(500).send(err);
    });
  }
  return router;
}
