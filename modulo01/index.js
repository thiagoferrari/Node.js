// importar módulo do express
const express = require('express')

// iniciando servidor express:
const server = express()


/* --------------- 'Hello World' --------------- */

/* // por meio de um GET na rota '/teste', res responde 'Hello World'
server.get('/teste', (req, res) => {
    return res.json({ message: 'Hello World' })
}) */


/* --------------- Parâmetros --------------- */

// LEMBRE-SE: NO TOTAL TEM 3 FORMAS DE PASSAR PARÂMETRO NA WEB:
// Query params = ...rota?nome=1
// Route params = /users/1
// Request body = { "name":"thiago", "email":"thiagofcjr@gmail.com"} - JSON

/* -------- Exemplos --------- */

// Ex. de Query params:
server.get('/teste', (req, res) => {
    let { nome } = req.query //desestruturado
    return res.json({ message: `Hello ${nome} tudo 100% na rota?` })
})
// coloque no browser: localhost:3000/teste?nome=thiago

/* ------------ */

// Ex. de Route params:
server.get('/users/:id', (req, res) => {
    const { id } = req.params //desestruturado
    return res.json({ message: `Buscando usuário ${id}` })
})
// coloque no browser: localhost:3000/users/7

// inicia o servidor ouvindo=(permitindo requisições) na porta 3000
server.listen(3000)