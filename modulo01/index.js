// importar módulo do express
const express = require('express')

// iniciando servidor express:
const server = express()

//passa pelo GET nenhum req e responde Hello World
server.get('/teste', (req, res) => {
    return res.json({ message: 'Hello World' })
})

// inicia o servidor ouvindo a porta 3000
server.listen(3000)