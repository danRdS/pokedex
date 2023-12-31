const documento = document.querySelector('html');
const lista = document.querySelector('.lista');

const descricao = document.querySelector('.descricao');
const h3About = document.getElementById('about');
let indexPokemonNaListaDoDB;

fetch('http://localhost:3000/pokemons/')
.then(response => response.json())
.then(relacaoPokemons => {
    relacaoPokemons.map((pokemon, indice) => {
        if(pokemon.nome == nome){
            indexPokemonNaListaDoDB = indice;
            lista.innerHTML += 
                `<li>
                    <a href="../../index.html" class="btnVoltarHome">
                        <i class="fa-solid fa-arrow-left"></i>
                    </a>
                    <h2>${pokemon.nome}</h2>
                </li>
                <li>#${pokemon.id}</li>
                <li><img src="${pokemon.urlImage}">
                    <section class="secaoBtnAnteriorProximo">
                        <button class="btnAnteriorProximo" id="btnAnteriorPokemon">
                            <i class="fa-solid fa-angle-left"></i>
                        </button>
                        <button class="btnAnteriorProximo" id="btnProximoPokemon">
                            <i class="fa-solid fa-angle-right"></i>
                        </button>
                    </section>
                </li>
                `
            }
        })
    btnAnteriorPokemon.addEventListener('click', () => apresentarPokemonAnterior(relacaoPokemons, indexPokemonNaListaDoDB));
    function apresentarPokemonAnterior(relacaoPokemons, indice){
        if(indice > 0){
            indice--
        } else {
            indice = relacaoPokemons.length - 1;
        }
        recarregarTelaComNovoPokemon(relacaoPokemons, indice);
    }

    btnProximoPokemon.addEventListener('click', () => apresentarProximoPokemon(relacaoPokemons, indexPokemonNaListaDoDB));
    function apresentarProximoPokemon(relacaoPokemons, indice){
        if(indice < relacaoPokemons.length - 1){
            indice++;
        } else {
            indice = 0;
        }
        recarregarTelaComNovoPokemon(relacaoPokemons, indice);
    }

    const recarregarTelaComNovoPokemon = (relacaoPokemons, indice) => {
        indexPokemonNaListaDoDB = indice;
        localStorage.nomePokemon = relacaoPokemons[indice].nome;
        localStorage.idPokemon = relacaoPokemons[indice].id;
        location.reload();
    }
})

let nome = localStorage.nomePokemon.toLowerCase();
let id = 0;

function alterarFormatoIdParaRequest(){
    let idPokemon = localStorage.idPokemon.replace('#', '');
    if(idPokemon < 10){
        idPokemon = idPokemon.replaceAll('0', '')

    } else if(idPokemon < 100 && idPokemon.startsWith('0')){
        idPokemon = idPokemon.replace('0', '');
    } 
    id = idPokemon;
}

alterarFormatoIdParaRequest();

let cor;
const container = document.querySelector('.container');
const tituloTabela = document.querySelector('.tituloTabela');
const elementosValorAtributo = document.querySelectorAll('.valorAtributo');
const elementosBarraDeValorDoAtributo = document.querySelectorAll('.barraDeValorDoAtributo');
let especies = `https://pokeapi.co/api/v2/pokemon-species/${id}/`;

fetch(especies)
.then(response => response.json())
.then(infosDaEspecie => {
    const textoDescricao = (infosDaEspecie.flavor_text_entries[3].flavor_text).toString().replaceAll('\n', ' ').replaceAll( '\f', ' ');
    descricao.innerText = textoDescricao;
})

const secaoTipo = document.querySelector('.secaoTipo');
const peso = document.getElementById('peso');
const altura = document.getElementById('altura');
const ataques = document.querySelector('.ataques');
const tabelaStatus = document.querySelector('.tabelaStatus');
const urlDadosPokemon = `https://pokeapi.co/api/v2/pokemon/${id}`;

fetch(urlDadosPokemon)
.then(response => response.json())
.then(dadosPokemon => {
    dadosPokemon.types.map(tipo => {
        secaoTipo.innerHTML += `<span class="tipo">${tipo.type.name}</span>`;
    })
    let spanTipo = document.querySelectorAll('.tipo');

    peso.innerText = `${(dadosPokemon.weight/10).toFixed(1).replace('.', ',')} kg`;
    altura.innerText = `${(dadosPokemon.height/10).toFixed(1).replace('.', ',')} m`;

    dadosPokemon.abilities.map(habilidade => {
        ataques.innerHTML += ` <span class="nomeAtaque">${habilidade.ability.name}</span>`
    })

    for(let posicao = 0; posicao < elementosValorAtributo.length; posicao++){
        let valorDoAtributo = dadosPokemon.stats[posicao].base_stat;
        elementosValorAtributo[posicao].innerHTML = definirCasasDecimaisDoValorAtributoTabela(valorDoAtributo)
        elementosBarraDeValorDoAtributo[posicao].setAttribute('value', valorDoAtributo)
    }
    
    let coresDosTiposDoPokemon = [];
    
    dadosPokemon.types.forEach((tipoDoPokemon, indice) => {
        let tipo = tipoDoPokemon.type.name;
        
        definirCorDoTipo(tipo);
        coresDosTiposDoPokemon.push(cor);
        const corPrimaria = coresDosTiposDoPokemon[0];

        documento.style.backgroundColor = corPrimaria;
        container.style.setProperty('--cor', corPrimaria);
        container.style.setProperty('--corSecundaria', corPrimaria+'aa');
        
        spanTipo[indice].style.backgroundColor = coresDosTiposDoPokemon[indice];
    })   
})

function definirCasasDecimaisDoValorAtributoTabela(valorDoAtributo){
    if(valorDoAtributo < 10){
        valorDoAtributo = `00${valorDoAtributo}`;
    } else if(valorDoAtributo < 100){
        valorDoAtributo = `0${valorDoAtributo}`;
    }
    return valorDoAtributo;
}

function definirCorDoTipo(tipo){
    switch(tipo){
        case 'bug':
            tipo = '#a7b723'
            cor = tipo;
            break;
        case 'dark':
            tipo = '#75574c';
            cor = tipo;
            break;
        case 'dragon':
            tipo = '#7037ff';
            cor = tipo;
            break;
        case 'electric':
            tipo = '#f9cf30';
            cor = tipo;
            break;
        case 'fairy':
            tipo = '#e69eac';
            cor = tipo;
            break;
        case 'fighting':
            tipo = '#c12239';
            cor = tipo;
            break;
        case 'fire':
            tipo = '#f57d31';
            cor = tipo;
            break;
        case 'flying':
            tipo = '#a891ec';
            cor = tipo;
            break;
        case 'ghost':
            tipo = '#70559b';
            cor = tipo;
            break;
        case 'normal':
            tipo = '#aaa67f';
            cor = tipo;
            break;        
        case 'grass':
            tipo = '#74cb48';
            cor = tipo;
            break;
        case 'ground':
            tipo = '#dec16b';
            cor = tipo;
            break;
        case 'ice':
            tipo = '#9ad6df';
            cor = tipo;
            break;
        case 'poison':
            tipo = '#a43e9e';
            cor = tipo;
            break;
        case 'psychic':
            tipo = '#fb5584';
            cor = tipo;
            break;
        case 'rock':
            tipo = '#b69e31';
            cor = tipo;
            break;
        case 'steel':
            tipo = '#b7b9d0';
            cor = tipo;
            break;
        case 'water':
            tipo = '#6493eb';
            cor = tipo;
            break;
    }
}