const express = require('express');
const router = express.Router();

const vehiclesControllers = require('../controllers/vehicles');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', vehiclesControllers.getAllVehicles);

router.get('/:id', vehiclesControllers.getVehicleById);

router.post('/', isAuthenticated, vehiclesControllers.createVehicles);

router.put('/:id', isAuthenticated, vehiclesControllers.updateVehicle);

router.delete('/:id', isAuthenticated, vehiclesControllers.deleteVehicle);


module.exports = router;