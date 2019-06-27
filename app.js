const express = require('express');
const app = express();

app.get('/', (req, res) => {
    return res.send({ message: 'tudo ok com o get' });
})

app.post('/', (req, res) => {
    return res.send({ message: 'tudo ok post' });
});

app.listen(3000);
module.exports = app;