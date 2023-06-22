const mongodb = require('../mongodb_connection/connection');
const objectId = require('mongodb').ObjectId;

const getPotentialOwners = async (req, res) => {
  const result = await mongodb.getDb().db('cse341_project_2').collection('potential_owners').find();

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getPotentialOwner = async (req, res) => {
  const id = new objectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('potential_owners')
    .find({ _id: id });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPotentialOwner = async (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    firstTimeOwner: req.body.firstTimeOwner,
    birthday: req.body.birthday,
    numberOfPetsOwned: req.body.numberOfPetsOwned
  };

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('potential_owners')
    .insertOne(data);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating a contact!');
  }
};

const updatePotentialOwner = async (req, res) => {
  const id = new objectId(req.params.id);

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    firstTimeOwner: req.body.firstTimeOwner,
    birthday: req.body.birthday,
    numberOfPetsOwned: req.body.numberOfPetsOwned
  };

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('potential_owners')
    .replaceOne({ _id: id }, data);

  console.log(response);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while updating a contact!');
  }
};

const deletePotentialOwner = async (req, res) => {
  const id = new objectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('potential_owners')
    .deleteOne({ _id: id }, true);

  console.log(response);

  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting a contact!');
  }
};

module.exports = {
  getPotentialOwners,
  getPotentialOwner,
  createPotentialOwner,
  updatePotentialOwner,
  deletePotentialOwner
};
