const routes = require('express').Router();
const contactsController = require('../controllers/potential_owners');
const { potentialOwnersValidation, validate } = require('../validation/validation.js');

routes.get('/', contactsController.getPotentialOwners);
routes.get('/:id', contactsController.getPotentialOwner);
routes.post('/', potentialOwnersValidation(), validate, contactsController.createPotentialOwner);
routes.put('/:id', potentialOwnersValidation(), validate, contactsController.updatePotentialOwner);
routes.delete('/:id', contactsController.deletePotentialOwner);

module.exports = routes;