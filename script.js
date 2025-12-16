// Configuração inicial
const elements = {
    textoSagrado: document.getElementById('texto-sagrado'), // Certifique-se que seu HTML tem uma div com esse ID
    tituloCapitulo: document.getElementById('titulo-capitulo'), // E um título h2/h3 com esse ID
    btnCarregar: document.getElementById('btn-carregar') // Seu botão de carregar
};

// Mapeamento simples de abreviações se necessário (A API usa abreviações em pt-br: gn, ex, ap)
// Se você já tem a lógica de pegar o livro selecionado, mantenha. Aqui é o coração da requisição.

async function abrirTexto(livro, capitulo) {
    // 1. Feedback visual imediato
    if(elements.textoSagrado) elements.textoSagrado.innerHTML = '<p class="loading">⏳ Carregando texto sagrado...</p>';
    
    // Chave única para salvar no navegador (Ex: "biblia_ap_12")
    const cacheKey = `biblia_${livro}_${capitulo}`;

    // 2. Tenta pegar do Cache primeiro (Sem internet, Sem erro)
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        console.log("Lendo da memória (Cache)...");
        renderizarTexto(JSON.parse(cachedData));
        return;
    }

    // 3. Se não tem no cache, busca na API usando um Proxy para evitar CORS
    try {
        // URL da API original
        const targetUrl = `https://www.abibliadigital.com.br/api/verses/nvi/${livro}/${capitulo}`;
        
        // Usando o corsproxy.io para "enganar" o servidor e permitir o acesso
        const proxyUrl = `https://corsproxy.io/?` + encodeURIComponent(targetUrl);

        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error(`Erro no servidor: ${response.status}`);
        }

        const data = await response.json();

        // Salva no cache para a próxima vez (Fica salvo pra sempre até limpar o navegador)
        localStorage.setItem(cacheKey, JSON.stringify(data));

        renderizarTexto(data);

    } catch (error) {
        console.error("Falha ao buscar:", error);
        if(elements.textoSagrado) {
            elements.textoSagrado.innerHTML = `
                <div class="erro-box">
                    <p>⚠️ Não foi possível carregar o texto sagrado.</p>
                    <small>Detalhe: ${error.message}</small>
                    <br>
                    <button onclick="abrirTexto('${livro}', '${capitulo}')">Tentar Novamente</button>
                </div>
            `;
        }
    }
}

function renderizarTexto(data) {
    // Validação de segurança
    if (!data || !data.verses) {
        elements.textoSagrado.innerHTML = '<p>Texto indisponível.</p>';
        return;
    }

    // Atualiza Título se existir
    if (elements.tituloCapitulo) {
        elements.tituloCapitulo.innerText = `${data.book.name} ${data.chapter.number}`;
    }

    // Monta o HTML dos versículos
    let htmlContent = '';
    data.verses.forEach(versiculo => {
        htmlContent += `
            <p class="versiculo">
                <span class="numero">${versiculo.number}</span>
                ${versiculo.text}
            </p>
        `;
    });

    elements.textoSagrado.innerHTML = htmlContent;
}

// --- EXEMPLO DE USO NO SEU BOTÃO ---
// (Adapte para como você pega os valores dos selects)
if (elements.btnCarregar) {
    elements.btnCarregar.onclick = function() {
        // Exemplo: pegando de inputs ou fixo para teste
        // Substitua 'ap' e '12' pelas variáveis dos seus <select>
        const livroSelecionado = 'ap'; // Pegue do seu select real
        const capituloSelecionado = 12; // Pegue do seu select real
        
        abrirTexto(livroSelecionado, capituloSelecionado);
    };
}
