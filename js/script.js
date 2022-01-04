if(window.location.href.indexOf('login.html') == -1 && sessionStorage.getItem('id') == null){
    window.location.href = '../html/login.html'  
}

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
    document.querySelector('#prox-ataque').innerHTML = `> ${parseInt(sessionStorage.getItem('ataque'))+50} <`
    document.querySelector('#prox-defesa').innerHTML = `> ${parseInt(sessionStorage.getItem('defesa'))+50} <`
    document.querySelector('#prox-vida').innerHTML = `> ${parseInt(sessionStorage.getItem('vida'))+500} <`
    document.querySelector('#pt-disponivel').innerHTML = sessionStorage.getItem('pontos')
}

if(window.location.href.indexOf('jogar.html') != -1){
    document.querySelector('#andar-atual').innerHTML += sessionStorage.getItem('andar')
    document.querySelector('#img-player').src += sessionStorage.getItem('classe')+'.png'
    recuperarAndar(parseInt(sessionStorage.getItem('andar')))

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
    }).finally()

    const dados = await resultado.json()

    if(typeof dados.id != 'undefined'){
        sessionStorage.setItem('id', dados.id)
        sessionStorage.setItem('usuario', dados.usuario)
        sessionStorage.setItem('classe', dados.classe)
        sessionStorage.setItem('nivel', dados.nivel)
        sessionStorage.setItem('pontos', dados.pontos)
        sessionStorage.setItem('ataque', dados.ataque)
        sessionStorage.setItem('defesa', dados.defesa)
        sessionStorage.setItem('vida', dados.vida)
        sessionStorage.setItem('andar', dados.andar)

        window.location.href = '../html/home.html'
    
    }else{
        document.querySelector('#feedback').innerHTML = 'Login Invalido'
    }

}

function atualizar(op){
    
    switch(op){
        case 0:
            sessionStorage.setItem('nivel', parseInt(sessionStorage.getItem('nivel')) + 1)
            sessionStorage.setItem('pontos', parseInt(sessionStorage.getItem('pontos')) + 1)
            break
        case 1:
            if(parseInt(sessionStorage.getItem('pontos')) > 0){
                sessionStorage.setItem('ataque', parseInt(sessionStorage.getItem('ataque')) + 50)
                sessionStorage.setItem('pontos', parseInt(sessionStorage.getItem('pontos')) - 1)
            }else{
                document.querySelector('#up-feedback').innerHTML = 'Pontos de Habilidade insuficiente'
            }
            break
        case 2:
            if(parseInt(sessionStorage.getItem('pontos')) > 0){
                sessionStorage.setItem('defesa', parseInt(sessionStorage.getItem('defesa')) + 50)
                sessionStorage.setItem('pontos', parseInt(sessionStorage.getItem('pontos')) - 1)
            }else{
                document.querySelector('#up-feedback').innerHTML = 'Pontos de Habilidade insuficiente'
            }
            break
        case 3:
            if(parseInt(sessionStorage.getItem('pontos')) > 0){
                sessionStorage.setItem('vida', parseInt(sessionStorage.getItem('vida')) + 500)
                sessionStorage.setItem('pontos', parseInt(sessionStorage.getItem('pontos')) - 1)
            }else{
                document.querySelector('#up-feedback').innerHTML = 'Pontos de Habilidade insuficiente'
            }
            break
        case 4:
            sessionStorage.setItem('andar', parseInt(sessionStorage.getItem('andar')) + 1)
            break
        case 5:
            sessionStorage.setItem('andar', 1)
            break
    }
    

    fetch('http://localhost:3000/atualizar', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: sessionStorage.getItem('id'),
            nivel: sessionStorage.getItem('nivel'),
            pontos: sessionStorage.getItem('pontos'),
            ataque: sessionStorage.getItem('ataque'),
            defesa: sessionStorage.getItem('defesa'),
            vida: sessionStorage.getItem('vida'),
            andar: sessionStorage.getItem('andar')

        })
    }).finally(() => {
        location.reload()
    })
}

function recuperarAndar(numAndar){
    fetch('http://localhost:3000/andar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            numAndar
        })
    }).then(dadosAndar => dadosAndar.json()).then(dadosAndar => {
        sessionStorage.setItem('andar-img', dadosAndar.img)
        sessionStorage.setItem('andar-dano', dadosAndar.dano)
        sessionStorage.setItem('andar-vida', dadosAndar.vida)
        document.querySelector('#img-inimigo').src += dadosAndar.img
    })
}

async function jogar(){
    let rodada = 1

    let player = {
        ataque: parseInt(sessionStorage.getItem('ataque')),
        defesa: parseInt(sessionStorage.getItem('defesa')),
        vida: parseInt(sessionStorage.getItem('vida'))
    }
    let inimigo = {
        dano: parseInt(sessionStorage.getItem('andar-dano')),
        vida: parseInt(sessionStorage.getItem('andar-vida'))
    }
    
    $('#loading').removeClass('desabilitar')
    $('#btn-play').addClass('desabilitar')
    do{ 
        if(rodada % 2 != 0){
            inimigo.vida -= player.ataque
            let vidaPorcentagem = (inimigo.vida*100)/(sessionStorage.getItem('andar-vida'))
            if(vidaPorcentagem < 0){
                document.querySelector('#vida-inimigo').style.width = '0%'
                document.querySelector('#vida-inimigo-texto').innerHTML = '0%'
            }else{
                document.querySelector('#vida-inimigo').style.width = vidaPorcentagem.toFixed(1) + '%'
                document.querySelector('#vida-inimigo-texto').innerHTML = vidaPorcentagem.toFixed(1) + '%'
            }

        }else{
            player.vida -= (inimigo.dano - (player.defesa/10))
            let vidaPorcentagem = (player.vida*100)/(sessionStorage.getItem('vida'))
            if(vidaPorcentagem < 0){
                document.querySelector('#vida-player').style.width = '0%'
                document.querySelector('#vida-player-texto').innerHTML = '0%'
            }else{
                document.querySelector('#vida-player').style.width = vidaPorcentagem.toFixed(1) + '%'
                document.querySelector('#vida-player-texto').innerHTML = vidaPorcentagem.toFixed(1) + '%'
            }
        }
        await time(500)
        rodada++
    }while(player.vida > 0 && inimigo.vida > 0)
        
    $('#loading').addClass('desabilitar')

    if(player.vida > 0 ){
        document.querySelector('#resultado').innerHTML = 'Você venceu'
        document.querySelector('#resultado').style.color = '#30cc30'
        $('#resultado').removeClass('desabilitar')
        $('#btn-proximo').removeClass('desabilitar')
    }else{
        document.querySelector('#resultado').innerHTML = 'Você Perdeu'
        document.querySelector('#resultado').style.color = '#ee3030'
        $('#resultado').removeClass('desabilitar')
        $('#btn-resetar').removeClass('desabilitar')
    }

}

async function time(ms){
    return new Promise(resolv => setTimeout(resolv, ms))
}

function sair(){
    sessionStorage.clear()
}