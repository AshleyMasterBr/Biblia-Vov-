// --- CONFIGURAÇÃO E DADOS ---

// Lista completa com abreviação e total de capítulos
const BIBLIA_LIVROS = [
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
    { nome: "Jeremias", abrev: "jr", caps: 52 },
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

// Elementos do DOM
const elements = {
    selectLivro: document.getElementById('select-livro'),
    selectCapitulo: document.getElementById('select-capitulo'),
    btnLer: document.getElementById('btn-carregar'),
    textoSagrado: document.getElementById('texto-sagrado'),
    tituloCapitulo: document.getElementById('titulo-capitulo')
};

// --- FUNÇÕES DE INICIALIZAÇÃO ---

function init() {
    carregarLivros();
    
    // Evento: Quando mudar o livro, atualiza a lista de capítulos
    elements.selectLivro.addEventListener('change', (e) => {
        carregarCapitulos(e.target.value);
    });

    // Evento: Botão de Ler
    elements.btnLer.addEventListener('click', () => {
        const livro = elements.selectLivro.value;
        const capitulo = elements.selectCapitulo.value;
        buscarTexto(livro, capitulo);
    });

    // Carrega capítulos do primeiro livro ao iniciar
    if(BIBLIA_LIVROS.length > 0) {
        carregarCapitulos(BIBLIA_LIVROS[0].abrev);
    }
}

function carregarLivros() {
    elements.selectLivro.innerHTML = '';
    BIBLIA_LIVROS.forEach(livro => {
        const option = document.createElement('option');
        option.value = livro.abrev;
        option.textContent = livro.nome;
        elements.selectLivro.appendChild(option);
    });
}

function carregarCapitulos(abrevLivro) {
    const livroData = BIBLIA_LIVROS.find(l => l.abrev === abrevLivro);
    if (!livroData) return;

    elements.selectCapitulo.innerHTML = '';
    for (let i = 1; i <= livroData.caps; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Capítulo ${i}`;
        elements.selectCapitulo.appendChild(option);
    }
}

// --- LÓGICA DE REQUISIÇÃO (CORE) ---

async function buscarTexto(livro, capitulo) {
    // 1. UI Loading
    elements.textoSagrado.innerHTML = '<div class="loading">⏳ Carregando texto sagrado...</div>';
    
    // 2. Tenta Cache Local (Performance)
    const cacheKey = `biblia_${livro}_${capitulo}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    if (cachedData) {
        console.log("Log: Carregado do cache.");
        renderizar(JSON.parse(cachedData));
        return;
    }

    // 3. Tenta API com Proxy NOVO (AllOrigins)
    try {
        const urlOriginal = `https://www.abibliadigital.com.br/api/verses/nvi/${livro}/${capitulo}`;
        
        // MUDANÇA AQUI: Trocamos corsproxy.io por api.allorigins.win
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(urlOriginal)}`;

        const response = await fetch(proxyUrl);
        
        if (!response.ok) throw new Error(`Erro API: ${response.status}`);
        
        const data = await response.json();

        // Salva no cache
        localStorage.setItem(cacheKey, JSON.stringify(data));
        
        renderizar(data);

    } catch (error) {
        console.error(error);
        elements.textoSagrado.innerHTML = `
            <div class="erro-box">
                <h3>⚠️ Serviço Temporariamente Indisponível</h3>
                <p>O servidor da Bíblia não respondeu.</p>
                <small>Erro técnico: ${error.message}</small>
                <br><br>
                <button onclick="window.location.reload()">Recarregar Página</button>
            </div>
        `;
    }
}

function renderizar(data) {
    // Validação extra
    if(!data || !data.verses) {
         elements.textoSagrado.innerHTML = '<p>Texto não encontrado.</p>';
         return;
    }

    // Título
    if (elements.tituloCapitulo) {
        elements.tituloCapitulo.innerText = `${data.book.name} ${data.chapter.number}`;
    }

    // Texto
    let html = '';
    data.verses.forEach(v => {
        html += `
            <p class="versiculo">
                <span class="numero">${v.number}</span>
                ${v.text}
            </p>
        `;
    });
    
    elements.textoSagrado.innerHTML = html;
}

// Inicia tudo
document.addEventListener('DOMContentLoaded', init);
