
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
        sessionStorage.setItem('idAtual', dados.id)
        sessionStorage.setItem('usuarioAtual', dados.usuario)
        sessionStorage.setItem('classeAtual', dados.classe)

        window.location.href = '../html/home.html'
    
    }else{
        document.querySelector('#feedback').innerHTML = 'Login Invalido'
    }

}

if(window.location.href.indexOf('home.html') != -1){
    document.querySelector('#perfil-id').innerHTML += sessionStorage.getItem('idAtual')
    document.querySelector('#perfil-nome').innerHTML += sessionStorage.getItem('usuarioAtual')
    document.querySelector('#perfil-classe').innerHTML += sessionStorage.getItem('classeAtual')
    document.querySelector('#perfil-img').src += sessionStorage.getItem('classeAtual')+'.png'
}