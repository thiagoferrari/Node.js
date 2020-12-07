/*packge.json armazena todas as dependencias do projeto*/

const express = require("express");

const server = express()

// PASSAGEM DE PARÂMETROS NA WEB:
// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Thiago", "email": "thiago@gmail.com" }


// CONSUMINDO DE QUERY PARAMS: (digite http://localhost:3000/teste?nome=Thiago)

server.get('/teste', (req, res) => {
    //const nome = req.query.nome
    const { nome } = req.query

    return res.json({ message: `Hello ${nome}` })
})



// CONSUMINDO DE ROUTE PARAMS: (digite http://localhost:3000/users/3)
server.get('/users/:id', (req, res) => {
    //const id = req.params.id
    const { id } = req.params

    return res.json({ message: `Buscando o usuário ${id}...` })
})


server.listen(3000)