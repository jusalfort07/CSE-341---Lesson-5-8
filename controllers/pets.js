const mongodb = require('../mongodb_connection/connection');
const objectId = require('mongodb').ObjectId;

const getPets = async (req, res) => {
  const result = await mongodb.getDb().db('cse341_project_2').collection('pets').find();

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getPet = async (req, res) => {
  const id = new objectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('pets')
    .find({ _id: id });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPet = async (req, res) => {
  const data = {
    name: req.body.name,
    birthday: req.body.birthday,
    breed: req.body.breed,
    color: req.body.color,
    sex: req.body.sex,
    size: req.body.size,
    weight: req.body.weight
  };

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('pets')
    .insertOne(data);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating a contact!');
  }
};

const updatePet = async (req, res) => {
  const id = new objectId(req.params.id);

  const data = {
    name: req.body.name,
    birthday: req.body.birthday,
    breed: req.body.breed,
    color: req.body.color,
    sex: req.body.sex,
    size: req.body.size,
    weight: req.body.weight
  };

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('pets')
    .replaceOne({ _id: id }, data);

  console.log(response);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while updating a contact!');
  }
};

const deletePet = async (req, res) => {
  const id = new objectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('pets')
    .deleteOne({ _id: id }, true);

  console.log(response);

  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting a contact!');
  }
};

module.exports = {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet
};
