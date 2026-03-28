const express = require('express');
const router = express.Router();

const driversControllers = require('../controllers/drivers');
const isAuthenticated = require('../middleware/authenticate');

router.get('/', driversControllers.getAllDrivers);

router.get('/:id', driversControllers.getDriverById);

router.post('/', isAuthenticated, driversControllers.createDriver);

router.put('/:id', isAuthenticated, driversControllers.updateDriver);

router.delete('/:id', isAuthenticated, driversControllers.deleteDriver);


module.exports = router;