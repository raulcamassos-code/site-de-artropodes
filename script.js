//ACORDEÃO (ABRIR E FECHAR CONTEÚDOS)
document.querySelectorAll(".titulo-acordeao").forEach(botao => {
    botao.addEventListener("click", () => {
        let conteudo = botao.nextElementSibling; //pegue o próximo elemento
        let simbolo = botao.querySelector("span");

        // Alterna entre block e none usando operador ternário
        conteudo.style.display = conteudo.style.display === "block" ? "none" : "block";
        simbolo.textContent = conteudo.style.display === "block" ? "−" : "+";
    });
});

//PASSO A PASSO
function mostrarAno(id, botao) {
    // Esconde todos os eventos de uma vez só
    document.querySelectorAll(".evento").forEach(ev => ev.style.display = "none");
    
    // Remove a classe 'ativo' de todos os botões de anos
    document.querySelectorAll(".anos button").forEach(btn => btn.classList.remove("ativo"));

    // Mostra o evento selecionado e ativa o botão atual
    let eventoSelecionado = document.getElementById(id);
    eventoSelecionado.style.display = "block";
    botao.classList.add("ativo");

    // Rolar suavemente até o marco
    eventoSelecionado.scrollIntoView({ behavior: "smooth", block: "center" });
}

//BLOCOS (ÓXIDOS BÁSICOS E ÁCIDOS)
function mostrarBlocoGuerra(id) {
    let conteudo = document.getElementById(id);
    let estavaAberto = conteudo.style.display === "block";

    // Fecha todos os blocos de guerra em uma linha
    document.querySelectorAll(".conteudo-guerra").forEach(bloco => bloco.style.display = "none");

    // Só reabre se ele já não estivesse aberto antes
    if (!estavaAberto) conteudo.style.display = "block";
}

//QUIZ (DADOS E LÓGICA)
const perguntas = [
    {"pergunta": "O que caracteriza os artrópodes?", "alternativas": ["Corpo mole e sem esqueleto", "Exoesqueleto de quitina e patas articuladas", "Esqueleto interno de ossos", "Corpo em forma de tubo sem segmentos"], "correta": 1, "explicacao": "Os artrópodes têm corpo segmentado, exoesqueleto de quitina e patas articuladas."},
    {"pergunta": "O que significa a palavra “Arthropoda”?", "alternativas": ["Muitos olhos", "Pés articulados", "Corpo duro", "Asas membranosas"], "correta": 1, "explicacao": "Arthropoda vem do grego e significa “pés articulados”."},
    {"pergunta": "Por que os artrópodes precisam fazer a muda (ecdise)?", "alternativas": ["Para trocar de cor", "Porque o exoesqueleto não cresce", "Para se reproduzir", "Para respirar melhor"], "correta": 1, "explicacao": "O exoesqueleto de quitina é rígido e não acompanha o crescimento, então o animal troca de “armadura” periodicamente."},
    {"pergunta": "Quantos pares de patas têm os insetos?", "alternativas": ["2", "3", "4", "5"], "correta": 1, "explicacao": "Os insetos têm 3 pares de patas, presas ao tórax."},
    {"pergunta": "Quantos pares de patas têm os aracnídeos?", "alternativas": ["3", "4", "5", "10"], "correta": 1, "explicacao": "Aranhas, escorpiões e ácaros têm 4 pares de patas (8 patas)."},
    {"pergunta": "Qual destes animais NÃO é um inseto?", "alternativas": ["Formiga", "Abelha", "Aranha", "Barata"], "correta": 2, "explicacao": "A aranha é um aracnídeo: tem 8 patas e não tem antenas."},
    {"pergunta": "O corpo de um inseto é dividido em:", "alternativas": ["Cefalotórax e abdome", "Cabeça, tórax e abdome", "Cabeça e cauda", "Tronco e membros"], "correta": 1, "explicacao": "Insetos têm cabeça, tórax (com patas e asas) e abdome."},
    {"pergunta": "Qual é o tipo de metamorfose da borboleta?", "alternativas": ["Incompleta (ovo, ninfa, adulto)", "Completa (ovo, larva, pupa, adulto)", "Não tem metamorfose", "Só tem as fases de ovo e adulto"], "correta": 1, "explicacao": "Na metamorfose completa há as fases de ovo, larva (lagarta), pupa (casulo) e adulto."},
    {"pergunta": "O gafanhoto passa por qual tipo de metamorfose?", "alternativas": ["Completa", "Incompleta", "Nenhuma", "Dupla"], "correta": 1, "explicacao": "Na metamorfose incompleta, o ovo origina uma ninfa parecida com o adulto, que cresce por mudas."},
    {"pergunta": "Qual destes animais é um crustáceo?", "alternativas": ["Escorpião", "Camarão", "Centopeia", "Carrapato"], "correta": 1, "explicacao": "Camarões, caranguejos, lagostas e tatuzinhos-de-jardim são crustáceos."},
    {"pergunta": "Quantos pares de antenas têm os crustáceos?", "alternativas": ["Nenhum", "1", "2", "3"], "correta": 2, "explicacao": "Os crustáceos têm 2 pares de antenas, diferente dos insetos, que têm apenas 1 par."},
    {"pergunta": "Os crustáceos aquáticos respiram principalmente por:", "alternativas": ["Traqueias", "Brânquias", "Pulmões", "Pele apenas"], "correta": 1, "explicacao": "Camarões, caranguejos e lagostas respiram por brânquias."},
    {"pergunta": "Qual é a diferença entre centopeia e piolho-de-cobra?", "alternativas": ["A centopeia tem 1 par de patas por segmento e é carnívora", "A centopeia é herbívora e o piolho-de-cobra é carnívoro", "Ambos têm 3 pares de patas", "Só o piolho-de-cobra é miriápode"], "correta": 0, "explicacao": "A centopeia tem 1 par de patas por segmento e é carnívora; o piolho-de-cobra tem 2 pares por segmento e é herbívoro."},
    {"pergunta": "Os insetos respiram principalmente por meio de:", "alternativas": ["Brânquias", "Pulmões", "Traqueias", "Pele úmida"], "correta": 2, "explicacao": "Nos insetos, tubos chamados traqueias levam o ar diretamente aos tecidos."},
    {"pergunta": "Qual inseto transmite a dengue?", "alternativas": ["Anopheles", "Barbeiro", "Aedes aegypti", "Mosca-doméstica"], "correta": 2, "explicacao": "O mosquito Aedes aegypti transmite dengue, zika, chikungunya e febre amarela."},
    {"pergunta": "Qual artrópode transmite a doença de Chagas?", "alternativas": ["Barbeiro", "Anopheles", "Pulga", "Carrapato-estrela"], "correta": 0, "explicacao": "A doença de Chagas é transmitida pelo barbeiro, que libera fezes com o protozoário perto da picada."},
    {"pergunta": "Qual é a principal função dos insetos polinizadores?", "alternativas": ["Decompor folhas", "Transportar pólen entre flores", "Controlar a temperatura do solo", "Produzir sementes sozinhos"], "correta": 1, "explicacao": "Ao visitar flores, abelhas e borboletas levam pólen de uma flor a outra, permitindo a formação de frutos."},
    {"pergunta": "O controle biológico de pragas consiste em:", "alternativas": ["Usar apenas agrotóxicos", "Usar inimigos naturais da praga", "Queimar a plantação", "Eliminar todos os insetos"], "correta": 1, "explicacao": "No controle biológico, utilizam-se predadores, parasitas ou microrganismos que atacam a praga."},
    {"pergunta": "Quem recebeu o Nobel por estudar a comunicação das abelhas?", "alternativas": ["Charles Darwin", "Karl von Frisch", "Carl Lineu", "Carlos Chagas"], "correta": 1, "explicacao": "Karl von Frisch recebeu o Nobel de Fisiologia ou Medicina em 1973 pelo estudo da dança das abelhas."}
];

let perguntaAtual = 0;
let pontos = 0;

function mostrarPergunta() {
    let pergunta = perguntas[perguntaAtual];
    
    document.getElementById("progresso").textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;
    document.getElementById("pergunta").textContent = pergunta.pergunta;
    
    let alternativasContainer = document.getElementById("alternativas");
    alternativasContainer.innerHTML = ""; // Limpa anterior

    pergunta.alternativas.forEach((alternativa, indice) => {
        let botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.onclick = () => verificarResposta(indice);
        alternativasContainer.appendChild(botao);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("proxima").style.display = "none";
}

function verificarResposta(indice) {
    let pergunta = perguntas[perguntaAtual];
    let botoes = document.querySelectorAll("#alternativas button");

    botoes.forEach(btn => btn.disabled = true);

    if (indice === pergunta.correta) {
        botoes[indice].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta correta! ${pergunta.explicacao}`;
        pontos++;
    } else {
        botoes[indice].classList.add("errada");
        botoes[pergunta.correta].classList.add("correta");
        document.getElementById("feedback").textContent = `Resposta incorreta. ${pergunta.explicacao}`;
    }

    document.getElementById("proxima").style.display = "block";
}

function proximaPergunta() {
    perguntaAtual++;
    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    let msg = pontos === perguntas.length ? "Excelente! Você acertou todas!" : 
              pontos >= 15 ? "Muito bom! Ótimo conhecimento." : "Vale a pena revisar o conteúdo.";

    document.getElementById("quiz-container").innerHTML = `
        <h3>Resultado final</h3>
        <p>Você acertou <strong>${pontos}</strong> de <strong>${perguntas.length}</strong> questões.</p>
        <p>${msg}</p>
        <button id='refazer' onclick='refazerQuiz()'>Refazer Quiz</button>
    `;
}

function refazerQuiz() {
    perguntaAtual = 0;
    pontos = 0;
    document.getElementById("quiz-container").innerHTML = `
        <p id="progresso"></p>
        <h3 id="pergunta"></h3>
        <div id="alternativas"></div>
        <p id="feedback"></p>
        <button id="proxima" onclick="proximaPergunta()">Próxima pergunta</button>
    `;
    mostrarPergunta();
}

// Inicialização automática do Quiz
if (document.getElementById("quiz-container")) {
    mostrarPergunta();
}
