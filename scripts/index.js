const button = document.getElementById('abriMod');
const modal = document.querySelector('dialog');
const fecha = document.querySelector('#fecha');
const btnEnv = document.querySelector('#Enviar');
const name = document.querySelector('#name');
const loader = document.querySelector('#loader');
const allPosts = document.querySelectorAll('#post')
const boxMessage = document.querySelector('#box-message');
let data;
const body = document.querySelector('body');
const conteinerPost = document.querySelector(".conteiner-posts")
const textos = ["pau","pênis","piroca","piru","pomba","pinto","pirocão","piroquinha","piriquito","p4u","piroc4","p3n1s","p3nis","p1nt0","p1into","bucetinha","buceta","vagina","piriquita","xana","rata","cu","cuzinho","rabão","rabao","anal","bunda","nadégas","puta","put4","putinha","put1nh4","put1nha","putinh4","fdp","FDP","arrombado","arrombadinho","arromb4do","arr0mb4do","arr0mb4d0",'SAFADO', 'safado',"puto","putao","put0","put40","puta0","cadela","vadia","rabuda","tesão","tesao","Tesão","gozar","porra","porr4","gozando","gozei","caralho","krl","c4ralh0","caralh0","c4ralh0","ordinário","viado","vi4do","viad0","vi4d0","safado","safadinha","safadinho","viradinho","v1ad1nh0","viadinh0","v1adinh0","viad1nh0","pnc","PNC","TCP","tcp","cv","CV","mamar","m4mar","mam4r","m4m4r","energúmena","encapetado","salafrario","imbecil","patético","inbecilidade","pussy","p4ssy","pussyfresh","cle4npussy","cleanpussy","penis","tmnc","TMNC","sfd","SFD","fuder","f4der","f0der","foder","fudido","fud1d0","fud1do","fudid0","sexo","sex0","sexual","sexu4l","transar","tr4nsar","tr4ns4r","trans4r","matar","m4t4r","m4tar","mat4r","esquartejar","esqu4rtej4r","esquartej4r","assassinar","4ss4ssinar","ass4ssinar","4ssassinar","assass1nar","4ss4ss1nar","estuprar","estupr4r","estrupo","estrupar","estuprar","estuprador","estupradora","estupr0","estupr4r","estupr4d0r4","cacete","cacete","fudedor","fudedora","fuded0r","fuded0r4","fudedor4","assassinar","assédio","assedio","assediador","assediadora","assed1o","assedi0","assed10","assediado","assediada","assd1ado","assediad0","assed1ada","assedi4d4","assed14da","assed14d4","Hitler","hitler","Nazi","nazista","suástica","nazi","fornicar","fornicação","fornicador","fornicadora","bct","BCT","maconha","cocaina","coca","c0c4","c0ca","coc4","crac","crack","F1","f1","fuma1","fumar","fumauma","cheirar","che1rar","cheir4r","che1r4r","narcotrafico","narcotráfico","nigga","nigger","n1gga","niga","n1ga","nigg4","nig4","fuck","fuckyou","fucker","fucking","bitch","b1tch"]




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
    const message = boxMessage.value
    const text = message.split(' ')
    
    for(var i = 0; i < text.length; i++){
        console.log(text[i])
        if(textos.includes(text[i])){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sem palavras feias amigo!'
            })
            console.log("Não foi enviado!")
        }else{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Você fez um comentário!',
                showConfirmButton: false,
                timer: 1500
            })

            const postEnvia = await axios.post('https://talk-to-me-api-mplz.onrender.com/post', {
                user: name.value,
                message: boxMessage.value
            }).then(
                () => console.log('Enviado com sucesso')
            ).catch(
                (err) => console.log('ERROR: ' + err)
            )

        }
    }
    
        
}

async function pegaDados() {
    loader.style.display = 'block';
    const pegaPosts = await axios.get('https://talk-to-me-api-mplz.onrender.com/allPosts').then(response => {
        data = response.data
        console.log(data)
    }).catch(err => console.log('ERROR:' + err))
    mostraComents(data)
    loader.style.display = 'none';
}

function mostraComents(data) {
    const datas = data
    for (let i = 0; i < datas.length; i++) {

        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');
        div.appendChild(h2)
        div.appendChild(p)
        body.appendChild(div)
        conteinerPost.appendChild(div)
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
    createElement()
    modal.close()
    await enviaDados()
    setTimeout(() => {
        location.reload()
    }, 3000);
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
