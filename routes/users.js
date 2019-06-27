const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({ message: 'ok get users' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'ok post users' });
});

module.exports = router;