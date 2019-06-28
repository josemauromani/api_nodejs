const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth_data);
    return res.status(200).send({ message: 'Essa informação é restrita' });
});

module.exports = router;