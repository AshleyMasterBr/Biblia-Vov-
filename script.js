// LISTA DE LIVROS (Coloquei os principais para testar, depois adicionamos todos)
const livrosData = [
    { nome: "Gênesis", abrev: "gn", caps: 50 },
    { nome: "Êxodo", abrev: "ex", caps: 40 },
    { nome: "Salmos", abrev: "sl", caps: 150 },
    { nome: "Provérbios", abrev: "pv", caps: 31 },
    { nome: "Isaías", abrev: "is", caps: 66 },
    { nome: "Mateus", abrev: "mt", caps: 28 },
    { nome: "Marcos", abrev: "mk", caps: 16 },
    { nome: "Lucas", abrev: "lk", caps: 24 },
    { nome: "João", abrev: "jo", caps: 21 },
    { nome: "Atos", abrev: "at", caps: 28 },
    { nome: "Romanos", abrev: "rm", caps: 16 },
    { nome: "Apocalipse", abrev: "ap", caps: 22 }
];

// VARIÁVEIS DE CONTROLE (Onde o usuário está)
let livroAtual = null;
let capituloAtual = 1;

// ELEMENTOS DA TELA
const telaLivros = document.getElementById("tela-livros");
const telaCapitulos = document.getElementById("tela-capitulos");
const telaLeitor = document.getElementById("tela-leitor");
const gridNumeros = document.getElementById("lista-numeros");
const textoArea = document.getElementById("texto-biblico");

// --- FUNÇÃO 1: INICIAR (MOSTRAR LIVROS) ---
function iniciarApp() {
    telaLivros.innerHTML = "";
    
    livrosData.forEach(livro => {
        const div = document.createElement("div");
        div.className = "card-livro";
        div.innerHTML = `
            <span>${livro.nome}</span>
            <span style="font-size: 14px; color: #666;">${livro.caps} caps</span>
        `;
        // Quando clicar no livro, abre os capítulos
        div.onclick = () => abrirCapitulos(livro);
        telaLivros.appendChild(div);
    });
}

// --- FUNÇÃO 2: ABRIR GRADE DE CAPÍTULOS ---
function abrirCapitulos(livro) {
    livroAtual = livro;
    document.getElementById("titulo-livro-escolhido").innerText = livro.nome;
    
    // Limpa a grade anterior
    gridNumeros.innerHTML = "";
    
    // Cria os botões de 1 até o total de capítulos
    for (let i = 1; i <= livro.caps; i++) {
        const btn = document.createElement("button");
        btn.className = "btn-capitulo";
        btn.innerText = i;
        btn.onclick = () => abrirTexto(i);
        gridNumeros.appendChild(btn);
    }

    // Troca de tela
    telaLivros.classList.add("escondido");
    telaCapitulos.classList.remove("escondido");
}

function voltarParaLivros() {
    telaCapitulos.classList.add("escondido");
    telaLivros.classList.remove("escondido");
}

// --- FUNÇÃO 3: ABRIR TEXTO (BUSCAR NA API) ---
async function abrirTexto(capitulo) {
    capituloAtual = capitulo;
    
    // Arruma a tela de leitura
    document.getElementById("titulo-leitura").innerText = `${livroAtual.nome} ${capitulo}`;
    textoArea.innerHTML = "<p style='text-align:center; margin-top:50px;'>⏳ Carregando texto sagrado...</p>";
    
    // Troca de tela
    telaCapitulos.classList.add("escondido");
    telaLeitor.classList.remove("escondido");

    try {
        // BUSCA NA INTERNET (API)
        const url = `https://www.abibliadigital.com.br/api/verses/nvi/${livroAtual.abrev}/${capitulo}`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        if (dados.verses) {
            let htmlFinal = "";
            dados.verses.forEach(verso => {
                htmlFinal += `<p style="margin-bottom: 15px;"><strong>${verso.number}.</strong> ${verso.text}</p>`;
            });
            textoArea.innerHTML = htmlFinal;
            // Rola para o topo
            textoArea.scrollTop = 0;
        } else {
            textoArea.innerHTML = "<p>Erro ao carregar. Verifique a internet.</p>";
        }
    } catch (erro) {
        console.error(erro);
        textoArea.innerHTML = "<p>Erro de conexão. O servidor não respondeu.</p>";
    }
}

function voltarParaCapitulos() {
    telaLeitor.classList.add("escondido");
    telaCapitulos.classList.remove("escondido");
}

// --- FUNÇÃO 4: BOTÕES PRÓXIMO/ANTERIOR ---
function mudarCapitulo(direcao) {
    const novoCapitulo = capituloAtual + direcao;
    
    if (novoCapitulo >= 1 && novoCapitulo <= livroAtual.caps) {
        abrirTexto(novoCapitulo);
    } else {
        alert("Fim do livro!");
    }
}

// RODA TUDO AO ABRIR
iniciarApp();
