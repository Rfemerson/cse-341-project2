const express = require('express');
const router = express.Router();

const controllers = require('../controllers/vehicles');

router.get('/vehicles', controllers.getAllVehicles);

router.get('/:id', controllers.getVehicleById);

router.post('/vehicles', controllers.createVehicles);

router.put('/:id', controllers.updateVehicle);

router.delete('/:id', controllers.deleteVehicle);


module.exports = router;