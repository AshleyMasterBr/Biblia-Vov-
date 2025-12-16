// LISTA DE LIVROS (Com as siglas ocultas para a API funcionar)
const livros = [
    { nome: "Gênesis", abrev: "gn", caps: 50 },
    { nome: "Êxodo", abrev: "ex", caps: 40 },
    { nome: "Levítico", abrev: "lv", caps: 27 },
    { nome: "Números", abrev: "nm", caps: 36 },
    { nome: "Deuteronômio", abrev: "dt", caps: 34 },
    { nome: "Josué", abrev: "js", caps: 24 },
    { nome: "Juízes", abrev: "jz", caps: 21 },
    { nome: "Rute", abrev: "rt", caps: 4 },
    { nome: "1 Samuel", abrev: "1sm", caps: 31 },
    { nome: "2 Samuel", abrev: "2sm", caps: 24 },
    { nome: "1 Reis", abrev: "1rs", caps: 22 },
    { nome: "2 Reis", abrev: "2rs", caps: 25 },
    { nome: "1 Crônicas", abrev: "1cr", caps: 29 },
    { nome: "2 Crônicas", abrev: "2cr", caps: 36 },
    { nome: "Esdras", abrev: "ed", caps: 10 },
    { nome: "Neemias", abrev: "ne", caps: 13 },
    { nome: "Ester", abrev: "et", caps: 10 },
    { nome: "Jó", abrev: "job", caps: 42 },
    { nome: "Salmos", abrev: "sl", caps: 150 },
    { nome: "Provérbios", abrev: "pv", caps: 31 },
    { nome: "Eclesiastes", abrev: "ec", caps: 12 },
    { nome: "Cânticos", abrev: "ct", caps: 8 },
    { nome: "Isaías", abrev: "is", caps: 66 },
    { nome: "Jeremias", abrev: "jer", caps: 52 },
    { nome: "Lamentações", abrev: "lm", caps: 5 },
    { nome: "Ezequiel", abrev: "ez", caps: 48 },
    { nome: "Daniel", abrev: "dn", caps: 12 },
    { nome: "Oseias", abrev: "os", caps: 14 },
    { nome: "Joel", abrev: "jl", caps: 3 },
    { nome: "Amós", abrev: "am", caps: 9 },
    { nome: "Obadias", abrev: "ob", caps: 1 },
    { nome: "Jonas", abrev: "jn", caps: 4 },
    { nome: "Miqueias", abrev: "mq", caps: 7 },
    { nome: "Naum", abrev: "na", caps: 3 },
    { nome: "Habacuque", abrev: "hc", caps: 3 },
    { nome: "Sofonias", abrev: "sf", caps: 3 },
    { nome: "Ageu", abrev: "ag", caps: 2 },
    { nome: "Zacarias", abrev: "zc", caps: 14 },
    { nome: "Malaquias", abrev: "ml", caps: 4 },
    { nome: "Mateus", abrev: "mt", caps: 28 },
    { nome: "Marcos", abrev: "mc", caps: 16 },
    { nome: "Lucas", abrev: "lc", caps: 24 },
    { nome: "João", abrev: "jo", caps: 21 },
    { nome: "Atos", abrev: "at", caps: 28 },
    { nome: "Romanos", abrev: "rm", caps: 16 },
    { nome: "1 Coríntios", abrev: "1co", caps: 16 },
    { nome: "2 Coríntios", abrev: "2co", caps: 13 },
    { nome: "Gálatas", abrev: "gl", caps: 6 },
    { nome: "Efésios", abrev: "ef", caps: 6 },
    { nome: "Filipenses", abrev: "fp", caps: 4 },
    { nome: "Colossenses", abrev: "cl", caps: 4 },
    { nome: "1 Tessalonicenses", abrev: "1ts", caps: 5 },
    { nome: "2 Tessalonicenses", abrev: "2ts", caps: 3 },
    { nome: "1 Timóteo", abrev: "1tm", caps: 6 },
    { nome: "2 Timóteo", abrev: "2tm", caps: 4 },
    { nome: "Tito", abrev: "tt", caps: 3 },
    { nome: "Filemom", abrev: "fm", caps: 1 },
    { nome: "Hebreus", abrev: "hb", caps: 13 },
    { nome: "Tiago", abrev: "tg", caps: 5 },
    { nome: "1 Pedro", abrev: "1pe", caps: 5 },
    { nome: "2 Pedro", abrev: "2pe", caps: 3 },
    { nome: "1 João", abrev: "1jo", caps: 5 },
    { nome: "2 João", abrev: "2jo", caps: 1 },
    { nome: "3 João", abrev: "3jo", caps: 1 },
    { nome: "Judas", abrev: "jd", caps: 1 },
    { nome: "Apocalipse", abrev: "ap", caps: 22 }
];

const listaContainer = document.getElementById("lista-livros");
let livroAtual = null;
let capituloAtual = 1;

// 1. CARREGA A LISTA LIMPA (Só nomes)
function carregarLista() {
    listaContainer.innerHTML = "";
    livros.forEach((livro) => {
        const div = document.createElement("div");
        div.className = "card-livro";
        // Visual limpo mantido
        div.innerHTML = `<span>${livro.nome}</span> <span class="seta">➤</span>`;
        div.onclick = () => abrirLeitor(livro);
        listaContainer.appendChild(div);
    });
}

// 2. ABRE O LEITOR
function abrirLeitor(livro) {
    livroAtual = livro;
    capituloAtual = 1;
    document.getElementById("leitor").classList.remove("escondido");
    buscarTextoNaAPI(); // Chama a função que busca na internet
}

function fecharLeitor() {
    document.getElementById("leitor").classList.add("escondido");
}

// 3. BUSCA O TEXTO REAL NA INTERNET (API)
async function buscarTextoNaAPI() {
    const titulo = document.getElementById("titulo-livro");
    const infoCap = document.getElementById("info-capitulo");
    const areaTexto = document.getElementById("texto-biblico");

    // Atualiza cabeçalho
    titulo.innerText = `${livroAtual.nome}`;
    infoCap.innerText = `Cap ${capituloAtual}`;
    
    // Mostra aviso de carregando
    areaTexto.innerHTML = `<p style="text-align:center; padding-top:50px; color:#666;">⏳ Buscando a palavra de Deus...</p>`;

    try {
        // Conecta na API "A Bíblia Digital" (Versão Almeida - ACF)
        const resposta = await fetch(`https://www.abibliadigital.com.br/api/verses/acf/${livroAtual.abrev}/${capituloAtual}`);
        
        if (!resposta.ok) throw new Error("Erro na conexão");
        
        const dados = await resposta.json();

        // Limpa o aviso de carregando
        areaTexto.innerHTML = "";
        
        // Adiciona título do capítulo
        const tituloCap = document.createElement("h3");
        tituloCap.style.marginBottom = "20px";
        tituloCap.innerText = `Capítulo ${capituloAtual}`;
        areaTexto.appendChild(tituloCap);

        // Adiciona cada versículo
        dados.verses.forEach(versiculo => {
            const p = document.createElement("p");
            p.innerHTML = `<strong>${versiculo.number}.</strong> ${versiculo.text}`;
            p.style.marginBottom = "10px"; // Espaço entre versículos
            areaTexto.appendChild(p);
        });

        // Rola pro topo
        areaTexto.scrollTop = 0;

    } catch (erro) {
        areaTexto.innerHTML = `
            <div style="text-align:center; padding-top:20px;">
                <p>⚠️ Não foi possível carregar.</p>
                <p style="font-size:16px">Verifique a internet do Vozinho.</p>
                <button onclick="buscarTextoNaAPI()" style="margin-top:20px; padding:10px 20px; font-size:18px;">Tentar de Novo</button>
            </div>
        `;
    }
}

// 4. NAVEGAÇÃO
function proximoCapitulo() {
    if (capituloAtual < livroAtual.caps) {
        capituloAtual++;
        buscarTextoNaAPI();
    } else {
        alert("Fim do Livro de " + livroAtual.nome);
    }
}

function capituloAnterior() {
    if (capituloAtual > 1) {
        capituloAtual--;
        buscarTextoNaAPI();
    }
}

// Inicia tudo
carregarLista();
