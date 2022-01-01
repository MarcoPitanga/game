async function connect(){
    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection
    }
    const mysql = require('mysql2/promise')

    var config = {
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'game',
        port: '3306'
    }

    const connection = await mysql.createConnection(config)
    global.connection = connection
    return connection
}

async function logar(usuario, senha){
    const conn = await connect();
    const dados = await conn.query(`select * from players where usuario = '${usuario}' and senha = '${senha}'`);
    return dados;
}

module.exports = {logar}