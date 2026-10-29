// =========================================================
// INICIO.JS: preenche a tela inicial
// O menu lateral NÃO é carregado aqui: ele já está no HTML
// e o script.js (do seu amigo) cuida de marcar o item ativo.
// Ideia central: separar os DADOS (listas no topo) da TELA (HTML).
// =========================================================

// ---------- 1) DADOS DE EXEMPLO (troque pelos reais quando houver back-end) ----------
const usuario = { nome: 'Elias', empresa: 'Serralheria do Elias' }; // "const" guarda um valor que não será trocado. { } cria um OBJETO: um conjunto de pares nome: valor

const clientes = [ // [ ] cria uma LISTA (array). Cada item dela é um objeto de cliente
    { nome: 'Augusto Silva Thibeco',  telefone: '(34) 99902-3149', cadastro: '25/03/2025' }, // Um cliente: texto entre aspas simples. A vírgula no fim separa do próximo item
    { nome: 'Casa de Peças Oswaldo',  telefone: '(34) 99902-3150', cadastro: '25/03/2025' }, // Segundo cliente
    { nome: 'Alessandro Junior',      telefone: '(34) 99902-3151', cadastro: '24/03/2025' }, // Terceiro cliente
    { nome: 'João Lázaro dos Santos', telefone: '(34) 99902-3152', cadastro: '22/03/2025' }, // Quarto cliente
    { nome: 'Sidney Pereira Soares',  telefone: '(34) 99902-3153', cadastro: '20/03/2025' }  // Quinto cliente (o último não leva vírgula)
]; // Fecha a lista de clientes

// Posição 0 de cada lista = mesmo dia (16/09), posição 1 = 17/09, e assim por diante.
const movimentos = { // Um objeto que guarda 4 listas
    dias:     ['16/09', '17/09', '18/09', '19/09', '20/09', '21/09', '22/09'], // Os 7 dias (textos)
    entradas: [8000, 12000, 9500, 14000, 11000, 17000, 20000], // Valores de entrada por dia (números, sem aspas)
    saidas:   [4000,  6000, 5000,  7500,  5500,  9000, 10000], // Valores de saída por dia
    despesas: [1500,  2000, 1800,  2500,  1900,  3000,  3500]  // Valores de despesa por dia
}; // Fecha os movimentos

// Usada no painel "Precisa de atenção".
const avisos = [ // Lista de avisos
    { texto: '3 orçamentos aguardando resposta', link: 'orcamentos.html' }, // Cada aviso tem o texto e a página para onde leva
    { texto: '1 nota fiscal pendente',           link: 'documentos.html' }, // Aviso 2
    { texto: 'R$ 1.500 em impostos atrasados',   link: 'despesas.html' },   // Aviso 3
    { texto: '2 salários atrasados',             link: 'relatorio.html' }   // Aviso 4
]; // Fecha a lista de avisos

// ---------- 2) FUNÇÕES AUXILIARES ----------
// Troca caracteres perigosos (< > & " ') por versões inofensivas.
const esc = t => String(t).replace(/[&<>"']/g, c => ({ // "t => ..." é uma FUNÇÃO curta (arrow function): recebe t e devolve o resultado. String(t) garante que é texto. .replace troca no texto tudo que casar com o padrão entre / /
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' // Tabela de troca: cada caractere perigoso vira seu código seguro
}[c])); // [c] consulta a tabela com o caractere encontrado e devolve a troca

const moeda = v => 'R$ ' + v.toLocaleString('pt-BR');       // Função que recebe um número e devolve "R$ " + o número formatado em português (24607 vira "24.607")
const $ = id => document.getElementById(id);                 // Atalho: $('x') é o mesmo que document.getElementById('x'), que acha o elemento do HTML com id="x"

// ---------- 3) SAUDAÇÃO E USUÁRIO ----------
const hora = new Date().getHours(); // new Date() = data e hora de agora; .getHours() pega só a hora (0 a 23)
const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'; // Operador "? :" é um if curto: se hora < 12 → 'Bom dia'; senão, se < 18 → 'Boa tarde'; senão → 'Boa noite'

const titulo = $('saudacao'); // Acha o <h1 id="saudacao"> no HTML e guarda na variável
titulo.textContent = saudacao + ', '; // .textContent escreve texto puro dentro do elemento. "+" junta textos: "Bom dia" + ", "
const nome = document.createElement('span'); // Cria um elemento <span> novo (ainda solto, fora da página)
nome.className = 'destaque'; // Dá a classe "destaque" ao span (o CSS pinta de laranja)
nome.textContent = usuario.nome.split(' ')[0];               // usuario.nome é 'Elias'; .split(' ') corta o texto nos espaços e devolve uma lista; [0] pega o primeiro pedaço (só o primeiro nome)
titulo.appendChild(nome); // Coloca o span dentro do título, depois do texto "Bom dia, "

$('avatar').textContent = usuario.nome[0]; // [0] em um texto pega a primeira letra ("E"), que vai para o quadrado laranja
$('nomeUsuario').textContent = usuario.nome; // Escreve o nome no topo
$('empresaUsuario').textContent = usuario.empresa; // Escreve a empresa embaixo do nome

// ---------- 4) TABELA DE CLIENTES RECENTES ----------
// "Augusto Silva Thibeco" -> "AT" (primeira e última palavra)
const iniciais = n => n.split(' ') // Recebe um nome e corta em palavras: ['Augusto','Silva','Thibeco']
    .filter((_, i, a) => i === 0 || i === a.length - 1) // .filter mantém só alguns itens: i é a posição e a é a lista toda. Mantém a posição 0 (primeira) OU a última (a.length - 1). O "_" ignora o valor, só usamos a posição
    .map(p => p[0]) // .map transforma cada palavra restante na sua primeira letra: ['A','T']
    .join(''); // .join('') junta as letras sem nada entre elas: "AT"

// .map() cria uma linha <tr> para cada cliente; .join('') junta tudo em um texto só.
// .innerHTML escreve HTML dentro do <tbody>. clientes.map(...) cria um pedaço de HTML para CADA cliente (c).
// A crase abre um texto que pode ter várias linhas e aceitar ${variáveis}. (Não coloque comentários DENTRO da crase: viram texto na tela!)
$('tabelaClientes').innerHTML = clientes.map(c => `
    <tr>
        <td><span class="iniciais">${esc(iniciais(c.nome))}</span>${esc(c.nome)}</td>
        <td>${esc(c.telefone)}</td>
        <td>${esc(c.cadastro)}</td>
    </tr>`).join(''); // ${...} insere o valor de uma expressão dentro do texto; esc() protege contra caracteres perigosos. O .join('') une todas as linhas em um texto só

// ---------- 5) GRÁFICO DE BARRAS ----------
const maior = Math.max(...movimentos.entradas, ...movimentos.saidas, ...movimentos.despesas); // Math.max acha o maior número. Os "..." espalham os itens de cada lista como números soltos. O maior vira 100% da altura

// Altura em % = valor ÷ maior valor × 100. O title é o balão ao passar o mouse.
const barra = (classe, rotulo, valor) => // Função que cria UMA barra. Recebe a classe de cor, o nome e o valor
    `<span class="${classe}" style="height:${valor / maior * 100}%" title="${rotulo}: ${moeda(valor)}"></span>`; // Devolve um <span> com a cor certa; a altura em % é a regra de três (valor ÷ maior × 100); title é o balão de texto ao passar o mouse

// Para cada dia (dia = texto, i = posição 0,1,2...), monta o HTML do dia.
$('grafico').innerHTML = movimentos.dias.map((dia, i) => `
    <div class="grafico-dia">
        <div class="grafico-barras">
            ${barra('barra-entrada', 'Entrada', movimentos.entradas[i])}
            ${barra('barra-saida', 'Saída', movimentos.saidas[i])}
            ${barra('barra-despesa', 'Despesa', movimentos.despesas[i])}
        </div>
        <small>${dia}</small>
    </div>`).join(''); // movimentos.entradas[i] pega o valor do dia na posição i. Cada dia vira 3 barras + a data embaixo

// ---------- 6) AVISOS ("Precisa de atenção") ----------
$('painelAvisos').innerHTML = avisos // Escreve dentro do <div id="painelAvisos">
    .map(a => `<a href="${a.link}">${esc(a.texto)} <i class="bi bi-arrow-right"></i></a>`) // Para cada aviso (a), cria um link: o destino vem de a.link e o texto de a.texto, seguido de uma seta
    .join(''); // Une todos os links em um texto só

// ---------- 7) MENU DO USUÁRIO (abre ao clicar na foto) ----------
const btnUsuario = $('btnUsuario'); // Guarda o botão do usuário
const menuUsuario = $('menuUsuario'); // Guarda a caixinha que abre

btnUsuario.addEventListener('click', e => { // addEventListener = "fique de olho neste evento". Quando houver um 'click' no botão, rode esta função (e = informações do clique)
    e.stopPropagation();                         // Impede o clique de "subir" para o resto da página (senão o clique do documento, lá embaixo, fecharia o menu na hora)
    menuUsuario.hidden = !menuUsuario.hidden;    // ".hidden" é true (escondido) ou false. O "!" inverte: se estava escondido, mostra; se estava visível, esconde
}); // Fecha o evento do botão

document.addEventListener('click', () => {      // Escuta cliques em QUALQUER lugar da página
    menuUsuario.hidden = true;                   // Esconde o menu: clicar fora fecha
}); // Fecha o evento do documento