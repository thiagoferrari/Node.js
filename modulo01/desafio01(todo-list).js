//link do desafio: https://github.com/rocketseat-education/bootcamp-gostack-desafio-01

const { json } = require("express");
const express = require("express");

const server = express()

// abaixo uso um plugin para ler json em req. POST
server.use(express.json())

/*****************************  DECLARAÇÃO DE VARS *********************************************/

let projeto = []
let contador = 0


/*****************************  START MIDDLEWARES *********************************************/

// Middleware para checar se index passado na URL não existe:
function checkId(req, res, next) {
    let idURL = req.params.id

    for (let i = 0; i < projeto.length; i++) {
        let rodandoFor = projeto[i].id
        if (rodandoFor == idURL) {
            return next()
        }
    }

    return res.status(400).json({ error: 'Este index passado na URL não existe' })
}


// Middleware de contagem de quantas requisições foram feitas na aplicação
server.use((req, res, next) => {
    next()

    contador += 1
    console.log(`qtd requisições foram feitas na aplicação: ${contador}`)
})

/*****************************  END MIDDLEWARES *********************************************/




/*********************************** START ROTAS *********************************************/

// ROTA PARA CRIAR PROJETO: (digite http://localhost:3000/projects)
server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body

    projeto.push({ id, title, tasks })

    return res.json(projeto)
})


// ROTA PARA RETORNAR TODAS projeto:
server.get('/projects', (req, res) => {
    return res.json(projeto)
})


// ROTA PARA EDITAR TÍTULO DO PROJETO:
server.put('/projects/:id', checkId, (req, res) => {
    const { id } = req.params

    const { newTitle } = req.body

    for (let i = 0; i < projeto.length; i++) {
        if (projeto[i].id == id) {
            projeto[i].title = newTitle
        }
    }

    return res.json(projeto)
})


// ROTA QUE DELETA projeto:
server.delete('/projects/:id', checkId, (req, res) => {
    const { id } = req.params

    for (let i = 0; i < projeto.length; i++) {
        if (projeto[i].id == id) {
            projeto.splice(i, 1)
        }
    }

    return res.json(projeto)

})


// ROTA PARA CRIAR TASK
server.post('/projects/:id/tasks', checkId, (req, res) => {
    const { id } = req.params

    const { titleTask } = req.body

    for (let i = 0; i < projeto.length; i++) {
        if (projeto[i].id == id) {

            projeto[i].tasks.push(titleTask)
        }
    }

    return res.json(projeto)
})

/*********************************** END ROTAS *********************************************/

// PORTA QUE ESPERA URL COM ROTAS PREENCHIDAS
server.listen(3000)