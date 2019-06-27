const express = require('express');
const router = express.Router();
const User = require('../models/users');

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if (err) return res.send({ error: 'Erro na consulta de usuário' });
        return res.send(data);
    })
});

router.post('/create', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: 'Dados insuficientes' });

    User.findOne({ email: email }, (err, data) => {
        if (err) return res.send({ error: 'Erro ao buscar usuario' });
        if (data) return res.send({ error: 'Usuário já existe' });

        User.create(req.body, (err, data) => {
            if (err) return res.send({ error: 'Erro ao criar usuário' });
            return res.send(data);
        });
    });
});

module.exports = router;