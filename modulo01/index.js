/*packge.json armazena todas as dependencias do projeto*/

const express = require("express");

const server = express()

// req (request é o que é passado na barra do browser, no caso do post o req é oculto!)
server.get('/teste', (req, res) => {
    return res.json({ message: 'hello world' })
})

server.listen(3000)