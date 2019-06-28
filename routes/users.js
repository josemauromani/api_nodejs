const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');

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
            data.password = undefined;
            return res.send(data);
        });
    });
});

router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.send({ error: 'Dados insuficientes!:-(' });

    User.findOne({ email }, (err, data) => {

        if (err) return res.send({ error: 'Erro ao busca usuário' });
        if (!data) return res.send({ error: 'Usuário não registrado' });

        bcrypt.compare(password, data.password, (err, same) => {
            if (!same) return res.send({ error: 'Erro ao autenticar usuário' });
            data.password = undefined;
            return res.send(data);
        })
    }).select('+password');

});

module.exports = router;