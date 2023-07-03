const mongodb = require('../mongodb_connection/connection');
const objectId = require('mongodb').ObjectId;

const getAdmins = async (req, res) => {
  const result = await mongodb.getDb().db('cse341_project_2').collection('admins').find();

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getAdmin = async (req, res) => {
  const id = new objectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('admins')
    .find({ _id: id });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createAdmin = async (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    isActive: req.body.isActive
  };

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('admins')
    .insertOne(data);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'An error occured while creating a contact!');
  }
};

const updateAdmin= async (req, res) => {
  const id = new objectId(req.params.id);

  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,
    isActive: req.body.isActive
  };

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('admins')
    .replaceOne({ _id: id }, data);

  console.log(response);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occured while updating a contact!');
  }
};

const deleteAdmin = async (req, res) => {
  const id = new objectId(req.params.id);

  const response = await mongodb
    .getDb()
    .db('cse341_project_2')
    .collection('admins')
    .deleteOne({ _id: id }, true);

  console.log(response);

  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'An error occurred while deleting a contact!');
  }
};

module.exports = {
  getAdmin,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
