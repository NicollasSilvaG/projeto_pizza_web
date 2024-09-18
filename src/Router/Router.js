// src/Router/Router.js
const express = require('express');
const router = express.Router();

// Definir rotas da API
router.get('/login', (req, res) => {
    res.send('requisição GET à página de login');
});

router.post('/', (req, res) => {
    res.send('requisição POST à homepage');
});

router.put('/', (req, res) => {
    res.send('Got a PUT request at /user');
});

router.delete('/', (req, res) => {
    res.send('Got a DELETE request at /user');
});

module.exports = router;
