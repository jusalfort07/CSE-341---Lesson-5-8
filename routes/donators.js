const routes = require('express').Router();
const donatorsControllers = require('../controllers/donators');
const { donatorsValidation, validate } = require('../validation/validation.js');

routes.get('/', donatorsControllers.getDonators);
routes.get('/:id', donatorsControllers.getDonator);donatorsControllers
routes.post('/', donatorsValidation(), validate, donatorsControllers.createDonator);
routes.put('/:id', donatorsValidation(), validate, donatorsControllers.updateDonator);
routes.delete('/:id', donatorsControllers.deleteDonator);

module.exports = routes;