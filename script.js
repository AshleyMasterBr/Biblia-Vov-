// DADOS (Simulando o JSON)
const livros = [
    { nome: "Gênesis", abrev: "Gn", caps: 50 },
    { nome: "Salmos", abrev: "Sl", caps: 150 },
    { nome: "João", abrev: "Jo", caps: 21 },
    { nome: "Apocalipse", abrev: "Ap", caps: 22 }
];

// 1. CARREGAR A LISTA NA TELA INICIAL
const listaContainer = document.getElementById("lista-livros");

function carregarLista() {
    listaContainer.innerHTML = ""; // Limpa tudo antes
    
    livros.forEach(livro => {
        // Cria o botão HTML via código
        const div = document.createElement("div");
        div.className = "card-livro";
        div.innerHTML = `
            <span>${livro.nome}</span>
            <span style="font-size: 14px; color: #666;">${livro.caps} caps 📖</span>
        `;
        
        // Adiciona o clique (ainda fake)
        div.onclick = () => abrirLeitor(livro.nome);
        
        listaContainer.appendChild(div);
    });
}

// 2. FUNÇÕES DE NAVEGAÇÃO
function abrirLeitor(nomeLivro) {
    document.getElementById("leitor").classList.remove("escondido");
    document.getElementById("titulo-livro").innerText = nomeLivro + " 1";
    document.getElementById("texto-biblico").innerText = "No princípio criou Deus os céus e a terra... (Texto de exemplo aqui)";
}

function fecharLeitor() {
    document.getElementById("leitor").classList.add("escondido");
}

// RODA AO INICIAR
carregarLista();
