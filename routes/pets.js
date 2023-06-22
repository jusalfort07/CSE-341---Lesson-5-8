const routes = require('express').Router();
const contactsController = require('../controllers/pets');

routes.get('/', contactsController.getPets);
routes.get('/:id', contactsController.getPet);
routes.post('/', contactsController.createPet);
routes.put('/:id', contactsController.updatePet);
routes.delete('/:id', contactsController.deletePet);

module.exports = routes;