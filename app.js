const config = require('./config/env');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const urlDb = config.bd_string;
const optionsDb = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true };

mongoose.connect(urlDb, optionsDb);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
    console.log('Erro:' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Aplicação desconectada do banco');
});

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao Banco de Dados');
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

app.use('/', indexRoutes);
app.use('/users', usersRoutes);

app.listen(3000);
module.exports = app;