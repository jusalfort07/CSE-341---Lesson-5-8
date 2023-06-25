const routes = require('express').Router();
const contactsController = require('../controllers/pets');
const { petsValidation, validate } = require('../validation/validation.js');

routes.get('/', contactsController.getPets);
routes.get('/:id', contactsController.getPet);
routes.post('/', petsValidation(), validate, contactsController.createPet);
routes.put('/:id', petsValidation(), validate, contactsController.updatePet);
routes.delete('/:id', contactsController.deletePet);

module.exports = routes;