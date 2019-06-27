const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.send({ message: 'ok get users' });
});

router.get('/fotos', (req, res) => {
    return res.send({ message: 'fotos do usuario' });
});

router.post('/', (req, res) => {
    return res.send({ message: 'ok post users' });
});

router.post('/create', (req, res) => {
    return res.send({message:'seu usuario foi criado'});
 });

module.exports = router;