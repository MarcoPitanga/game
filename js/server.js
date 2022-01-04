const cors = require('cors')
const express = require('express')
const db = require('./db')
const server = express()
const port = 3000

const andar = require('./andares')

server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cors())

server.post('/logar', async (req, res) => {
    const resultado = await db.logar(req.body.usuario, req.body.senha)

    
    if(resultado[0][0]){
        console.log(resultado[0][0])
        res.json(resultado[0][0])
    }else{
        res.send(false)
    }
})

server.put('/atualizar', async (req, res) => {
    db.atualizar(req.body)
    res.send()
})

server.post('/andar/', async (req, res) => {
    res.json(andar[req.body.numAndar])
})



server.listen(port, () => {
    console.log('Para fechar o servidor: ctrl + c')
})