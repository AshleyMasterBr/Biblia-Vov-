// VERSÃO DEFINITIVA - BIBLE-API.COM
const livros = [
    { nome: "Gênesis", caps: 50 }, { nome: "Êxodo", caps: 40 }, { nome: "Levítico", caps: 27 },
    { nome: "Números", caps: 36 }, { nome: "Deuteronômio", caps: 34 }, { nome: "Josué", caps: 24 },
    { nome: "Juízes", caps: 21 }, { nome: "Rute", caps: 4 }, { nome: "1 Samuel", caps: 31 },
    { nome: "2 Samuel", caps: 24 }, { nome: "1 Reis", caps: 22 }, { nome: "2 Reis", caps: 25 },
    { nome: "1 Crônicas", caps: 29 }, { nome: "2 Crônicas", caps: 36 }, { nome: "Esdras", caps: 10 },
    { nome: "Neemias", caps: 13 }, { nome: "Ester", caps: 10 }, { nome: "Jó", caps: 42 },
    { nome: "Salmos", caps: 150 }, { nome: "Provérbios", caps: 31 }, { nome: "Eclesiastes", caps: 12 },
    { nome: "Cânticos", caps: 8 }, { nome: "Isaías", caps: 66 }, { nome: "Jeremias", caps: 52 },
    { nome: "Lamentações", caps: 5 }, { nome: "Ezequiel", caps: 48 }, { nome: "Daniel", caps: 12 },
    { nome: "Oseias", caps: 14 }, { nome: "Joel", caps: 3 }, { nome: "Amós", caps: 9 },
    { nome: "Obadias", caps: 1 }, { nome: "Jonas", caps: 4 }, { nome: "Miqueias", caps: 7 },
    { nome: "Naum", caps: 3 }, { nome: "Habacuque", caps: 3 }, { nome: "Sofonias", caps: 3 },
    { nome: "Ageu", caps: 2 }, { nome: "Zacarias", caps: 14 }, { nome: "Malaquias", caps: 4 },
    { nome: "Mateus", caps: 28 }, { nome: "Marcos", caps: 16 }, { nome: "Lucas", caps: 24 },
    { nome: "João", caps: 21 }, { nome: "Atos", caps: 28 }, { nome: "Romanos", caps: 16 },
    { nome: "1 Coríntios", caps: 16 }, { nome: "2 Coríntios", caps: 13 }, { nome: "Gálatas", caps: 6 },
    { nome: "Efésios", caps: 6 }, { nome: "Filipenses", caps: 4 }, { nome: "Colossenses", caps: 4 },
    { nome: "1 Tessalonicenses", caps: 5 }, { nome: "2 Tessalonicenses", caps: 3 },
    { nome: "1 Timóteo", caps: 6 }, { nome: "2 Timóteo", caps: 4 }, { nome: "Tito", caps: 3 },
    { nome: "Filemom", caps: 1 }, { nome: "Hebreus", caps: 13 }, { nome: "Tiago", caps: 5 },
    { nome: "1 Pedro", caps: 5 }, { nome: "2 Pedro", caps: 3 }, { nome: "1 João", caps: 5 },
    { nome: "2 João", caps: 1 }, { nome: "3 João", caps: 1 }, { nome: "Judas", caps: 1 },
    { nome: "Apocalipse", caps: 22 }
];

const listaContainer = document.getElementById("lista-livros");
let livroAtual = null;
let capituloAtual = 1;

function carregarLista() {
    listaContainer.innerHTML = "";
    livros.forEach((livro) => {
        const div = document.createElement("div");
        div.className = "card-livro";
        div.innerHTML = `<span>${livro.nome}</span> <span class="seta">➤</span>`;
        div.onclick = () => abrirLeitor(livro);
        listaContainer.appendChild(div);
    });
}

function abrirLeitor(livro) {
    livroAtual = livro;
    capituloAtual = 1;
    document.getElementById("leitor").classList.remove("escondido");
    buscarTextoNaAPI();
}

function fecharLeitor() {
    document.getElementById("leitor").classList.add("escondido");
}

async function buscarTextoNaAPI() {
    const titulo = document.getElementById("titulo-livro");
    const infoCap = document.getElementById("info-capitulo");
    const areaTexto = document.getElementById("texto-biblico");

    titulo.innerText = `${livroAtual.nome}`;
    infoCap.innerText = `Cap ${capituloAtual}`;
    areaTexto.innerHTML = `<p style="text-align:center; padding-top:50px; color:#666;">⏳ Buscando a palavra...</p>`;

    try {
        const nomeFormatado = encodeURIComponent(livroAtual.nome);
        // Usa a API bible-api.com que é estável
        const url = `https://bible-api.com/${nomeFormatado}+${capituloAtual}?translation=almeida`;
        
        const resposta = await fetch(url);
        if (!resposta.ok) throw new Error("Erro na conexão");
        const dados = await resposta.json();

        areaTexto.innerHTML = "";
        const tituloCap = document.createElement("h3");
        tituloCap.style.marginBottom = "20px";
        tituloCap.innerText = `Capítulo ${capituloAtual}`;
        areaTexto.appendChild(tituloCap);

        dados.verses.forEach(versiculo => {
            const p = document.createElement("p");
            p.innerHTML = `<strong>${versiculo.verse}.</strong> ${versiculo.text.trim()}`;
            p.style.marginBottom = "10px";
            areaTexto.appendChild(p);
        });
        areaTexto.scrollTop = 0;

    } catch (erro) {
        console.error(erro);
        areaTexto.innerHTML = `<div style="text-align:center; padding-top:20px;"><p>⚠️ Falha ao carregar.</p><button onclick="buscarTextoNaAPI()" style="margin-top:20px; padding:10px;">Tentar de Novo</button></div>`;
    }
}

function proximoCapitulo() {
    if (capituloAtual < livroAtual.caps) {
        capituloAtual++;
        buscarTextoNaAPI();
    } else {
        alert("Fim do Livro!");
    }
}

function capituloAnterior() {
    if (capituloAtual > 1) {
        capituloAtual--;
        buscarTextoNaAPI();
    }
}

carregarLista();
