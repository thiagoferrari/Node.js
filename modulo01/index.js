/*packge.json armazena todas as dependencias do projeto*/

const { json } = require("express");
const express = require("express");

const server = express()

// abaixo uso um plugin para ler json em req. POST
server.use(express.json())

// PASSAGEM DE PARÂMETROS NA WEB:
// Query params = ?teste=1
// Route params = /users/1
// Request body = { "name": "Thiago", "email": "thiago@gmail.com" }


// ROTA PARA FALAR HELLO (digite http://localhost:3000/teste?nome=Thiago)
//*CONSUMINDO DE QUERY PARAMS:
server.get('/teste', (req, res) => {
    //const nome = req.query.nome
    const { nome } = req.query

    return res.json({ message: `Hello ${nome}` })
})


// CRUD ABAIXO PRONTO:

// ROTA PARA LISTAR UM USUÁRIO (digite http://localhost:3000/users/3)
//*CONSUMINDO DE ROUTE PARAMS:
const users = ['Thiago', 'Mateus', 'Victor']

server.get('/users/:index', (req, res) => {

    // pegando o user a partir do index inserido no array:
    const { index } = req.params

    return res.json({ message: `user correspondente a este index: ${users[index]}` })
})


// ROTA PARA LISTAR TODOS OS USUÁRIOS: (digite http://localhost:3000/users)

server.get('/users', (req, res) => {
    return res.json(users)
})


// ROTA PARA CRIAR USUÁRIOS: (digite http://localhost:3000/users) - JSON contem name
server.post('/users', (req, res) => {
    const { name } = req.body

    users.push(name)

    return res.json(users)
})


// ROTA PARA ALTERAR USUÁRIOS: 
server.put('/users/:index', (req, res) => {
    const { index } = req.params

    const { name } = req.body

    users[index] = name

    return res.json(users)
})

// ROTA PARA DELETAR USUÁRIOS: 
server.delete('/users/:index', (req, res) => {
    const { index } = req.params

    users.splice(index, 1)

    return res.send()
})


// PORTA QUE ESPERA URL COM ROTAS PREENCHIDAS
server.listen(3000)