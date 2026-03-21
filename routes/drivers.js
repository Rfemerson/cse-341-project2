const express = require('express');
const router = express.Router();

const controllers = require('../controllers/drivers');

router.get('/drivers', controllers.getAllDrivers);

router.get('/:id', controllers.getDriverById);

router.post('/drivers', controllers.createDriver);

router.put('/:id', controllers.updateDriver);

router.delete('/:id', controllers.deleteDriver);


module.exports = router;