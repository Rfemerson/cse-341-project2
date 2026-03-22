const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello Emerson']
    res.send('Hello Emerson!')
});

router.use('/vehicles', require('./vehicles'));

router.use('/drivers', require('./drivers'));


module.exports = router;