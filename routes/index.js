const router = require('express').Router();

router.get('/', (req, res) => {
    //#swagger.tags = ['Hello Emerson']
    res.send('Hello Emerson!')
});

module.exports = router;