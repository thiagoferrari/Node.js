/*packge.json armazena todas as dependencias do projeto*/

const { json } = require("express");
const express = require("express");

const server = express()

// abaixo uso um plugin para ler json em req. POST
server.use(express.json())



/**************************************************************************/



// MIDDLEWARES: ele é um interceptador, e o next permite ele prosseguir ou não!
// (eles podem mudar os valores de req, res)

//GLOBAL: (executa em todos sem ter que chamar)
server.use((req, res, next) => {
    // req.method busca se foi GET, POST, PUT
    console.log(`método: ${req.method}; URL: ${req.url}`)

    next()

    // esse log abaixo é executado depois que o next rodou
    console.log('Tudo foi executado!')
})


//LOCAL: (passamos no chamamento da rota)
// middleware para checar se nome dentro json existe name:
function checkUserExists(req, res, next) {
    if (!req.body.name) { // se for true que não existe nenhum user com esse nome:
        return res.status(400).json({ error: 'User name is required in json' })
    }

    return next()
}

// middleware para checar se o index do user passado existe:
function checkUserInArray(req, res, next) {
    if (!users[req.params.index]) {
        return res.status(400).json({ error: 'User does not exists' })
    }

    return next()

    req.user = user

}


/**************************************************************************/


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



/**************************************************************************/



// CRUD ABAIXO PRONTO:

// ROTA PARA LISTAR UM USUÁRIO (digite http://localhost:3000/users/3)
//*CONSUMINDO DE ROUTE PARAMS:
const users = ['Thiago', 'Mateus', 'Victor']

server.get('/users/:index', checkUserInArray, (req, res) => {

    // pegando o user a partir do index inserido no array:
    const { index } = req.params
    //                                                       req.user veio do middleware!
    return res.json({ message: `user correspondente a este index: ${req.user}` })
})


// ROTA PARA LISTAR TODOS OS USUÁRIOS: (digite http://localhost:3000/users)

server.get('/users', (req, res) => {
    return res.json(users)
})


// ROTA PARA CRIAR USUÁRIOS: (digite http://localhost:3000/users) - JSON contem name
server.post('/users', checkUserExists, (req, res) => {
    const { name } = req.body

    users.push(name)

    return res.json(users)
})


// ROTA PARA ALTERAR USUÁRIOS: 
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) => {
    const { index } = req.params

    const { name } = req.body

    users[index] = name

    return res.json(users)
})

// ROTA PARA DELETAR USUÁRIOS: 
server.delete('/users/:index', checkUserInArray, (req, res) => {
    const { index } = req.params

    users.splice(index, 1)

    return res.send()
})




// PORTA QUE ESPERA URL COM ROTAS PREENCHIDAS
server.listen(3000)