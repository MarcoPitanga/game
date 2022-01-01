async function logar(){
    let logUsuario = document.querySelector('#log-usuario').value
    let logSenha = document.querySelector('#log-senha').value

    const resultado = await fetch('http://localhost:3000/logar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            usuario: logUsuario,
            senha: logSenha
        })
    }).finally(() => {
        
    })

    const dados = await resultado.json()

    if(typeof dados.id != 'undefined'){
        var idAtual = dados.id
        var usuarioAtual = dados.usuario
        var classeAtual = dados.classe
    
        console.log(`ID: ${idAtual}\nUSUARIO: ${usuarioAtual}\nCLASSE: ${classeAtual}`)
        window.location.href = '../html/home.html'
    
    }else{
        document.querySelector('#feedback').innerHTML = 'Login Invalido'
    }

}