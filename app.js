const express = require('express');
const app = express();

const indexRoutes = require('./routes/index');
const usersRoutes = require('./routes/users');

app.use('/', indexRoutes);
app.use('/users', usersRoutes);

app.listen(3000);
module.exports = app;