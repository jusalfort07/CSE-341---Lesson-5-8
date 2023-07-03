const routes = require('express').Router();
const adminsController = require('../controllers/admins');
const { adminsValidation, validate } = require('../validation/validation.js');

routes.get('/', adminsController.getAdmins);
routes.get('/:id', adminsController.getAdmin);
routes.post('/', adminsValidation(), validate, adminsController.createAdmin);
routes.put('/:id', adminsValidation(), validate, adminsController.updateAdmin);
routes.delete('/:id', adminsController.deleteAdmin);

module.exports = routes;