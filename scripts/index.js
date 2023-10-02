
const button = document.getElementById('abriMod');
const modal = document.querySelector('dialog');
const fecha = document.querySelector('#fecha');
const btnEnv = document.querySelector('#Enviar');
const name = document.querySelector('#name');
const allPosts = document.querySelectorAll('#post')
const boxMessage = document.querySelector('#box-message');
let data;
const body = document.querySelector('body');
const conteinerPost = document.querySelector(".conteiner-posts")



function createElement() {
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const p = document.createElement('p');

    conteinerPost.appendChild(div)
    div.appendChild(h2)
    div.appendChild(p)
    body.appendChild(div)
    div.id = 'post'
    h2.id = 'user'
    p.id = 'message'

    h2.innerText = name.value
    p.innerText = boxMessage.value
}

async function enviaDados() {
    const postEnvia = await axios.post('talk-to-me-api-mplz.onrender.com/post', {
        user: name.value,
        message: boxMessage.value
    }).then(
        () => console.log('Enviado com sucesso')
    ).catch(
        (err) => console.log('ERROR: ' + err)
    )
}

async function pegaDados() {
    const pegaPosts = await axios.get('talk-to-me-api-mplz.onrender.com/allPosts').then(response => {
        data = response.data
    }).catch(err => console.log('ERROR:' + err))
    mostraComents(data)
}

function mostraComents(data) {
    const datas = data
    for (let i = 0; i < datas.length; i++) {

        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');

        conteinerPost.appendChild(div)
        div.appendChild(h2)
        div.appendChild(p)
        body.appendChild(div)
        div.id = 'post'
        h2.id = 'user'
        p.id = 'message'
        h2.innerText = datas[i].nome
        p.innerText = datas[i].conteudo      

        h2.innerText = datas[i].nome
        p.innerText = datas[i].conteudo        
    
            
    }
}

const age = async () => {
    await enviaDados()
    createElement()
    modal.close()
}


btnEnv.addEventListener('click', () => {
    age()
})

button.onclick = () => {
    modal.showModal()
}

fecha.onclick = () => {
    modal.close()
}
window.onload = () => {
    pegaDados()
    mostraComents()
}