const exp = require('constants')
const express = require('express')
const server = express()
const port = 3000

server.use(express.json())
server.use(express.urlencoded({ extended:false }))



server.listen(port, () => {
    console.log()
})