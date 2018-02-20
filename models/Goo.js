const mongoose = require('mongoose');
const request = require('request');

// Define and compile Goo Schema
const GooSchema = mongoose.Schema({
  title:       String,
  location:    String,
  description: String,
  startDate:   Date,
  endDate:     Date,
  tags:        [], // list of tags (events type)
  people:      [], // list of person id
  maxPeople:   Number,
});

const GooModel = mongoose.model('Goo', GooSchema);


// Goo functions
/**
  Create and save a new Goo in the db
  @param {Object[]} GooData
*/
function saveGoo(GooData) {
  const newGoo = new GooModel({
    title:       GooData.title,
    location:    GooData.location,
    description: GooData.description,
    startDate:   GooData.startDate,
    endDate:     GooData.endDate,
    tags:        GooData.tags,
    people:      GooData.people,
    maxPeople:   GooData.maxPeople,
  });
  return newGoo.save().catch(function (err) {
    if (err) console.log("Goo save error:", err);
  });
}
function deleteGoo(gooId) {
  return GooModel.remove(
    { _id: gooId}
  );
}
/**
  Gets all Goos
  @param {Object[]} [filter] - Optional mongoose filter
*/
function getGoos(filter) {
  return GooModel.find(filter).sort('-startDate').lean()
  .catch(function(err){
    console.log(err);
  });
}

/**
  Gets the first matching Goo
  @param {Object[]} [filter] - Optional mongoose filter
*/
function getOneGoo(filter) {
  return GooModel.findOne(filter).catch(function(err){
    console.log(err);
  });
}

let Goo = {};

Goo.model          = GooModel;
Goo.saveGoo        = saveGoo;
Goo.getGoos        = getGoos;
Goo.getOneGoo      = getOneGoo;
Goo.deleteGoo      = deleteGoo;

module.exports     = Goo;
