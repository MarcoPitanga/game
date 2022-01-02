if(window.location.href.indexOf('home.html') != -1){
    document.querySelector('#perfil-nome').innerHTML += sessionStorage.getItem('usuario')
    document.querySelector('#perfil-classe').innerHTML += sessionStorage.getItem('classe')
    document.querySelector('#perfil-img').src += sessionStorage.getItem('classe')+'.png'
    document.querySelector('#perfil-nivel').innerHTML += sessionStorage.getItem('nivel')
    document.querySelector('#perfil-ataque').innerHTML += sessionStorage.getItem('ataque')
    document.querySelector('#perfil-defesa').innerHTML += sessionStorage.getItem('defesa')
    document.querySelector('#perfil-vida').innerHTML += sessionStorage.getItem('vida')

}

if(window.location.href.indexOf('upgrade.html') != -1){
    document.querySelector('#up-ataque').innerHTML = `> ${sessionStorage.getItem('ataque')} <`
    document.querySelector('#up-defesa').innerHTML = `> ${sessionStorage.getItem('defesa')} <`
    document.querySelector('#up-vida').innerHTML = `> ${sessionStorage.getItem('vida')} <`
    document.querySelector('#pt-disponivel').innerHTML = sessionStorage.getItem('pontoHabilidade')
}


if(window.location.href.indexOf('login.html') == -1 && sessionStorage.getItem('id') == null){
    window.location.href = '../html/login.html'
    
}





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
        sessionStorage.setItem('id', dados.id)
        sessionStorage.setItem('usuario', dados.usuario)
        sessionStorage.setItem('classe', dados.classe)
        sessionStorage.setItem('nivel', dados.nivel)
        sessionStorage.setItem('pontoHabilidade', dados.pontos)
        sessionStorage.setItem('ataque', dados.ataque)
        sessionStorage.setItem('defesa', dados.defesa)
        sessionStorage.setItem('vida', dados.vida)

        window.location.href = '../html/home.html'
    
    }else{
        document.querySelector('#feedback').innerHTML = 'Login Invalido'
    }

}

function sair(){
    sessionStorage.clear()
}