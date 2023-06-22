const routes = require('express').Router();
const contactsController = require('../controllers/potential_owners');

routes.get('/', contactsController.getPotentialOwners);
routes.get('/:id', contactsController.getPotentialOwner);
routes.post('/', contactsController.createPotentialOwner);
routes.put('/:id', contactsController.updatePotentialOwner);
routes.delete('/:id', contactsController.deletePotentialOwner);

module.exports = routes;