const config = require('../config/env');
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_password , { expiresIn: config.jwt_expires });
}

router.get('/', (req, res) => {
    User.find({}, (err, data) => {
        if (err) return res.send({ error: 'Erro na consulta de usuário' });
        return res.send(data);
    })
});

router.post('/create', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });

    try {
        if (await User.findOne({ email })) return res.status(400).send({ error: 'Usuário já registrado' });

        const usuario = await User.create(req.body);
        usuario.password = undefined;
        return res.status(201).send({ usuario, token: createUserToken(usuario.id) });

    } catch (err) {
        return res.status(500).send({ error: 'Erro ao criar usuario' });
    }

});

router.post('/auth', async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!:-(' });

    try {

        const usuario = await User.findOne({ email }).select('+password');

        if (!usuario) return res.status(400).send({ error: 'Usuário não registrado' });

        const passok = await bcrypt.compare(password, usuario.password);
        if (!passok) return res.status(401).send({ error: 'Senhas não conferem' });

        usuario.password = undefined;
        return res.status(200).send({ usuario, token: createUserToken(usuario.id) });

    } catch (err) {
        return res.status(500).send({ error: 'Erro ao buscar usuário' });
    }

});

module.exports = router;


/**
 * STATUS CODE
 * 
 * 200 - OK
 * 201 - CREATED
 * 202 - ACCEPTED
 * 
 * 400 - BAD REQUEST
 * 401 - NÃO AUTORIZADO (TEMPORÁRIO)
 * 403 - NEGADO (PERMANENTE)
 * 404 - NÃO ENCONTRADO
 * 
 * 500 - ERRO INTERNO
 * 501 - NÃO IMPLEMENTADO
 * 503 - SERVIÇO INDISPONÍVEL (MANUTENÇÃO)
 *  
 */