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
const users = ['Thiago', 'Cláudio', 'Victor']
server.get('/users/:index', (req, res) => {
    
    // pegando o user a partir do index inserido no array:
    const { index } = req.params

    return res.json({ message: `user correspondente a este index: ${users[index]}` })
})


server.listen(3000)