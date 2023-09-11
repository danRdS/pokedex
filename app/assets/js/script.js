// fetch('https://pokeapi.co/api/v2/pokemon/1')
// .then(response => response.json())
// .then(data => {
//     console.log(data)
//     console.log('ID:', data.id)
//     console.log(`Nome: ${data.forms[0].name}`)
// })

// let urlImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const form = document.querySelector('form');
form.addEventListener('submit', e => e.preventDefault());

const container = document.querySelector('.container');
const badRequest = document.getElementById('badRequest');

async function requisitarPokemos() {
    try{
        const responsePokemons = await fetch('http://localhost:3000/pokemons');
        const listaPokemons = await responsePokemons.json();
        montaElementos(listaPokemons, listaPokemonRenderizada);

        const elementosListaPokemonRenderizada = document.querySelectorAll('.lista li');        
        elementosListaPokemonRenderizada.forEach(elemento => {
            elemento.addEventListener('click', () => {
                let filho = elemento.children;
                for(let pokemon of filho){
                    localStorage.nomePokemon = pokemon.lastElementChild.innerText;
                    localStorage.idPokemon = pokemon.firstElementChild.innerText;
                }
            })
        })

    } catch(err){
        badRequest.innerText = `${err.message}`;
    }
}

requisitarPokemos();

const inputPesquisaPokemon = document.getElementById('valorDeBusca');
const infoSemResultadosBusca = document.querySelector('.infoSemResultadosBusca');
const listaPokemonRenderizada = document.querySelector('.lista');

const search = (inputPesquisaPokemon, mensagemSemResultadosDeBusca, listaPokemonRenderizada) => {
    const elementosListaPokemonRenderizada = document.querySelectorAll('.lista li');
    let valorBuscaDigitadoPeloUsuario = inputPesquisaPokemon.value;
    let temResultadoBusca = false;

    elementosListaPokemonRenderizada.forEach(item => {
        if(item.innerText.toLowerCase().includes(valorBuscaDigitadoPeloUsuario.toLowerCase())){
            item.style.display = 'block';
            temResultadoBusca = true;
            listaPokemonRenderizada.style.display = 'flex';
            mensagemSemResultadosDeBusca.style.display = 'none';
        } else {
            item.style.display = 'none';
        }
    })

    if(!temResultadoBusca){
        mensagemSemResultadosDeBusca.style.display = 'block';
        mensagemSemResultadosDeBusca.innerHTML = `Nenhum resultado encontrado para "${valorBuscaDigitadoPeloUsuario}"`;
    }
};

function montaElementos(listaPokemons, listaPokemonRenderizada){
    const pokemons = listaPokemons.map(pokemon => {
        return `<li>
                    <a href="#0" onclick="abrirDetalhesPokemon()" class="optionPokemon">
                        <span class="spanId">#${pokemon.id}</span> 
                        <img class="imgPokemon" src="${pokemon.urlImage}">
                        <p class="nomePokemon">${pokemon.nome}</p>
                    </a>
                </li>`
    })
    listaPokemonRenderizada.innerHTML = `${pokemons.join('')}`;
}

function abrirDetalhesPokemon(){
    setTimeout(() => {
        location.href = 'secondView/infosPokemon.html';
    });
}

const btnResetPesquisa = document.getElementById('btnResetPesquisa');

btnResetPesquisa.addEventListener('click', () => {
    requisitarPokemos();
    escondeInfoErroBusca(infoSemResultadosBusca);
})

const escondeInfoErroBusca = semResultados => {
    semResultados.style.display = 'none';
}

const btnParametroPesquisa = document.getElementById('btnParametroPesquisa');
const backgroundMenuPesquisa = document.querySelector('.backgroundMenuPesquisa');
const campoMenuPesquisa = document.querySelector('.campoMenuPesquisa');

const mudarFormaPesquisa = () => {
    campoMenuPesquisa.classList.toggle('visible');
    backgroundMenuPesquisa.classList.toggle('visible');
}

backgroundMenuPesquisa.addEventListener('click', () => {
    mudarFormaPesquisa();
})

const buscaPorId = document.getElementById('buscaPorId');
const buscaPorNome = document.getElementById('buscaPorNome');

buscaPorId.addEventListener('click', () => mudarValorBotaoPesquisa(inputPesquisaPokemon));
buscaPorNome.addEventListener('click', () => mudarValorBotaoPesquisa(inputPesquisaPokemon));

window.onload = () => {
    let indicadorBtnParametroPesquisa = localStorage.indicadorBtnParametroPesquisa;
    if(indicadorBtnParametroPesquisa == 'A'){
        buscaPorNome.checked = true;
        mudarValorBotaoPesquisa(inputPesquisaPokemon);
    }
}

function mudarValorBotaoPesquisa(inputPesquisaPokemon){
    if(buscaPorNome.checked){
        localStorage.indicadorBtnParametroPesquisa = 'A';
        btnParametroPesquisa.innerText = 'A';
        btnParametroPesquisa.style.textDecoration = 'underline';
        inputPesquisaPokemon.setAttribute('type', 'text');
        inputPesquisaPokemon.setAttribute('onkeypress', "if (isNaN(String.fromCharCode(window.event.keyCode))) return true; else return false;")
    } else {
        btnParametroPesquisa.innerText = '#';
        localStorage.indicadorBtnParametroPesquisa = '#';
        btnParametroPesquisa.style.textDecoration = 'none';
        inputPesquisaPokemon.setAttribute('type', 'number');
        inputPesquisaPokemon.removeAttribute('onkeypress');
    }
}