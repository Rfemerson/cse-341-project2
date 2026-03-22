const express = require('express');
const router = express.Router();

const vehiclesControllers = require('../controllers/vehicles');

router.get('/', vehiclesControllers.getAllVehicles);

router.get('/:id', vehiclesControllers.getVehicleById);

router.post('/', vehiclesControllers.createVehicles);

router.put('/:id', vehiclesControllers.updateVehicle);

router.delete('/:id', vehiclesControllers.deleteVehicle);


module.exports = router;