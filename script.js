// LISTA COMPLETA DOS 66 LIVROS
const livros = [
    // Velho Testamento
    { nome: "Gênesis", abrev: "Gn", caps: 50 },
    { nome: "Êxodo", abrev: "Ex", caps: 40 },
    { nome: "Levítico", abrev: "Lv", caps: 27 },
    { nome: "Números", abrev: "Nm", caps: 36 },
    { nome: "Deuteronômio", abrev: "Dt", caps: 34 },
    { nome: "Josué", abrev: "Js", caps: 24 },
    { nome: "Juízes", abrev: "Jz", caps: 21 },
    { nome: "Rute", abrev: "Rt", caps: 4 },
    { nome: "1 Samuel", abrev: "1Sm", caps: 31 },
    { nome: "2 Samuel", abrev: "2Sm", caps: 24 },
    { nome: "1 Reis", abrev: "1Rs", caps: 22 },
    { nome: "2 Reis", abrev: "2Rs", caps: 25 },
    { nome: "1 Crônicas", abrev: "1Cr", caps: 29 },
    { nome: "2 Crônicas", abrev: "2Cr", caps: 36 },
    { nome: "Esdras", abrev: "Ed", caps: 10 },
    { nome: "Neemias", abrev: "Ne", caps: 13 },
    { nome: "Ester", abrev: "Et", caps: 10 },
    { nome: "Jó", abrev: "Jó", caps: 42 },
    { nome: "Salmos", abrev: "Sl", caps: 150 },
    { nome: "Provérbios", abrev: "Pv", caps: 31 },
    { nome: "Eclesiastes", abrev: "Ec", caps: 12 },
    { nome: "Cânticos", abrev: "Ct", caps: 8 },
    { nome: "Isaías", abrev: "Is", caps: 66 },
    { nome: "Jeremias", abrev: "Jr", caps: 52 },
    { nome: "Lamentações", abrev: "Lm", caps: 5 },
    { nome: "Ezequiel", abrev: "Ez", caps: 48 },
    { nome: "Daniel", abrev: "Dn", caps: 12 },
    { nome: "Oseias", abrev: "Os", caps: 14 },
    { nome: "Joel", abrev: "Jl", caps: 3 },
    { nome: "Amós", abrev: "Am", caps: 9 },
    { nome: "Obadias", abrev: "Ob", caps: 1 },
    { nome: "Jonas", abrev: "Jn", caps: 4 },
    { nome: "Miqueias", abrev: "Mq", caps: 7 },
    { nome: "Naum", abrev: "Na", caps: 3 },
    { nome: "Habacuque", abrev: "Hc", caps: 3 },
    { nome: "Sofonias", abrev: "Sf", caps: 3 },
    { nome: "Ageu", abrev: "Ag", caps: 2 },
    { nome: "Zacarias", abrev: "Zc", caps: 14 },
    { nome: "Malaquias", abrev: "Ml", caps: 4 },
    // Novo Testamento
    { nome: "Mateus", abrev: "Mt", caps: 28 },
    { nome: "Marcos", abrev: "Mc", caps: 16 },
    { nome: "Lucas", abrev: "Lc", caps: 24 },
    { nome: "João", abrev: "Jo", caps: 21 },
    { nome: "Atos", abrev: "At", caps: 28 },
    { nome: "Romanos", abrev: "Rm", caps: 16 },
    { nome: "1 Coríntios", abrev: "1Co", caps: 16 },
    { nome: "2 Coríntios", abrev: "2Co", caps: 13 },
    { nome: "Gálatas", abrev: "Gl", caps: 6 },
    { nome: "Efésios", abrev: "Ef", caps: 6 },
    { nome: "Filipenses", abrev: "Fp", caps: 4 },
    { nome: "Colossenses", abrev: "Cl", caps: 4 },
    { nome: "1 Tessalonicenses", abrev: "1Ts", caps: 5 },
    { nome: "2 Tessalonicenses", abrev: "2Ts", caps: 3 },
    { nome: "1 Timóteo", abrev: "1Tm", caps: 6 },
    { nome: "2 Timóteo", abrev: "2Tm", caps: 4 },
    { nome: "Tito", abrev: "Tt", caps: 3 },
    { nome: "Filemom", abrev: "Fm", caps: 1 },
    { nome: "Hebreus", abrev: "Hb", caps: 13 },
    { nome: "Tiago", abrev: "Tg", caps: 5 },
    { nome: "1 Pedro", abrev: "1Pe", caps: 5 },
    { nome: "2 Pedro", abrev: "2Pe", caps: 3 },
    { nome: "1 João", abrev: "1Jo", caps: 5 },
    { nome: "2 João", abrev: "2Jo", caps: 1 },
    { nome: "3 João", abrev: "3Jo", caps: 1 },
    { nome: "Judas", abrev: "Jd", caps: 1 },
    { nome: "Apocalipse", abrev: "Ap", caps: 22 }
];

const listaContainer = document.getElementById("lista-livros");
let livroAtual = null;
let capituloAtual = 1;

// FUNÇÃO PRINCIPAL: Carrega a lista na tela
function carregarLista() {
    listaContainer.innerHTML = "";
    
    livros.forEach((livro, index) => {
        const div = document.createElement("div");
        div.className = "card-livro";
        
        // Define se é Velho ou Novo Testamento pelo índice (39 livros no VT)
        const testamento = index < 39 ? "Velho Test." : "Novo Test.";
        
        div.innerHTML = `
            <div>
                <span style="display:block">${livro.nome}</span>
                <span class="tag-testamento">${testamento}</span>
            </div>
            <span style="font-size: 16px; color: #888;">${livro.caps} Caps ➤</span>
        `;
        
        div.onclick = () => abrirLeitor(livro);
        listaContainer.appendChild(div);
    });
}

// ABRE O LEITOR
function abrirLeitor(livro) {
    livroAtual = livro;
    capituloAtual = 1; // Sempre começa no cap 1 ao abrir
    
    document.getElementById("leitor").classList.remove("escondido");
    atualizarTexto();
}

// FECHA O LEITOR
function fecharLeitor() {
    document.getElementById("leitor").classList.add("escondido");
}

// CARREGA O TEXTO DO CAPÍTULO (Aqui viria a API, por enquanto é simulado)
function atualizarTexto() {
    document.getElementById("titulo-livro").innerText = `${livroAtual.nome}`;
    document.getElementById("info-capitulo").innerText = `Cap ${capituloAtual}`;
    
    // Simulação do texto bíblico
    document.getElementById("texto-biblico").innerHTML = `
        <h3>Capítulo ${capituloAtual}</h3>
        <p>1. No princípio, Deus criou os céus e a terra...</p>
        <p>2. A terra, porém, estava sem forma e vazia...</p>
        <p><i>(Texto demonstrativo do ${livroAtual.nome} capítulo ${capituloAtual})</i></p>
        <br><br>
        <p style="text-align:center; color:#888;">--- Fim da Página ---</p>
    `;

    // Rola para o topo
    document.getElementById("texto-biblico").scrollTop = 0;
}

// NAVEGAÇÃO
function proximoCapitulo() {
    if (capituloAtual < livroAtual.caps) {
        capituloAtual++;
        atualizarTexto();
    } else {
        alert("Fim do Livro!");
    }
}

function capituloAnterior() {
    if (capituloAtual > 1) {
        capituloAtual--;
        atualizarTexto();
    }
}

// Inicia
carregarLista();
