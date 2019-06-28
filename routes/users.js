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

router.post('/create', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: 'Dados insuficientes' });

    try {
        if (await User.findOne({ email })) return res.send({ error: 'Usuário já registrado' });

        const usuario = await User.create(req.body);
        usuario.password = undefined;
        return res.send(usuario);

    } catch (err) {
        return res.send({ error: 'Erro ao buscar usuario' });
    }

});

router.post('/auth', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.send({ error: 'Dados insuficientes!:-(' });

    try {

        const usuario = await User.findOne({ email }).select('+password');

        if (!usuario) return res.send({ error: 'Usuário não registrado' });

        const passok = await bcrypt.compare(password, usuario.password);
        if (!passok) return res.send({ error: 'Senhas não conferem' });

        usuario.password = undefined;
        return res.send(usuario);

    } catch (err) {
        return res.send({ error: 'Erro ao buscar usuário' });
    }

});

module.exports = router;