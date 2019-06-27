const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({ message: 'ok get raiz' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'ok post raiz' });
});

module.exports = router;