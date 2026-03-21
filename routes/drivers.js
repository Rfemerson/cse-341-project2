const express = require('express');
const router = express.Router();

const driversControllers = require('../controllers/drivers');

router.get('/drivers', driversControllers.getAllDrivers);

router.get('/:id', driversControllers.getDriverById);

router.post('/drivers', driversControllers.createDriver);

router.put('/:id', driversControllers.updateDriver);

router.delete('/:id', driversControllers.deleteDriver);


module.exports = router;