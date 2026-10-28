// =========================================================
// INICIO.JS: preenche a tela inicial
// O menu lateral NÃO é carregado aqui: ele já está no HTML
// e o script.js (do seu amigo) cuida de marcar o item ativo.
// =========================================================

// ---------- 1) DADOS DE EXEMPLO (troque pelos reais quando houver back-end) ----------
const usuario = { nome: 'Elias', empresa: 'Serralheria do Elias' };

const clientes = [
    { nome: 'Augusto Silva Thibeco',  telefone: '(34) 99902-3149', cadastro: '25/03/2025' },
    { nome: 'Casa de Peças Oswaldo',  telefone: '(34) 99902-3150', cadastro: '25/03/2025' },
    { nome: 'Alessandro Junior',      telefone: '(34) 99902-3151', cadastro: '24/03/2025' },
    { nome: 'João Lázaro dos Santos', telefone: '(34) 99902-3152', cadastro: '22/03/2025' },
    { nome: 'Sidney Pereira Soares',  telefone: '(34) 99902-3153', cadastro: '20/03/2025' }
];

// Posição 0 de cada lista = mesmo dia (16/09), posição 1 = 17/09, e assim por diante.
const movimentos = {
    dias:     ['16/09', '17/09', '18/09', '19/09', '20/09', '21/09', '22/09'],
    entradas: [8000, 12000, 9500, 14000, 11000, 17000, 20000],
    saidas:   [4000,  6000, 5000,  7500,  5500,  9000, 10000],
    despesas: [1500,  2000, 1800,  2500,  1900,  3000,  3500]
};

// Usada no painel "Precisa de atenção".
const avisos = [
    { texto: '3 orçamentos aguardando resposta', link: 'orcamentos.html' },
    { texto: '1 nota fiscal pendente',           link: 'documentos.html' },
    { texto: 'R$ 1.500 em impostos atrasados',   link: 'despesas.html' },
    { texto: '2 salários atrasados',             link: 'relatorio.html' }
];

// ---------- 2) FUNÇÕES AUXILIARES ----------
// Troca caracteres perigosos (< > & " ') por versões inofensivas.
const esc = t => String(t).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));
const moeda = v => 'R$ ' + v.toLocaleString('pt-BR');       // 24607 -> "R$ 24.607"
const $ = id => document.getElementById(id);                 // atalho para getElementById

// ---------- 3) SAUDAÇÃO E USUÁRIO ----------
const hora = new Date().getHours();
const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite';

const titulo = $('saudacao');
titulo.textContent = saudacao + ', ';
const nome = document.createElement('span');
nome.className = 'destaque';
nome.textContent = usuario.nome.split(' ')[0];               // só o primeiro nome
titulo.appendChild(nome);

$('avatar').textContent = usuario.nome[0];
$('nomeUsuario').textContent = usuario.nome;
$('empresaUsuario').textContent = usuario.empresa;

// ---------- 4) TABELA DE CLIENTES RECENTES ----------
// "Augusto Silva Thibeco" -> "AT" (primeira e última palavra)
const iniciais = n => n.split(' ')
    .filter((_, i, a) => i === 0 || i === a.length - 1)
    .map(p => p[0])
    .join('');

// .map() cria uma linha <tr> para cada cliente; .join('') junta tudo em um texto só.
$('tabelaClientes').innerHTML = clientes.map(c => `
    <tr>
        <td><span class="iniciais">${esc(iniciais(c.nome))}</span>${esc(c.nome)}</td>
        <td>${esc(c.telefone)}</td>
        <td>${esc(c.cadastro)}</td>
    </tr>`).join('');

// ---------- 5) GRÁFICO DE BARRAS ----------
const maior = Math.max(...movimentos.entradas, ...movimentos.saidas, ...movimentos.despesas);

// Altura em % = valor ÷ maior valor × 100. O title é o balão ao passar o mouse.
const barra = (classe, rotulo, valor) =>
    `<span class="${classe}" style="height:${valor / maior * 100}%" title="${rotulo}: ${moeda(valor)}"></span>`;

$('grafico').innerHTML = movimentos.dias.map((dia, i) => `
    <div class="grafico-dia">
        <div class="grafico-barras">
            ${barra('barra-entrada', 'Entrada', movimentos.entradas[i])}
            ${barra('barra-saida', 'Saída', movimentos.saidas[i])}
            ${barra('barra-despesa', 'Despesa', movimentos.despesas[i])}
        </div>
        <small>${dia}</small>
    </div>`).join('');

// ---------- 6) AVISOS ("Precisa de atenção") ----------
$('painelAvisos').innerHTML = avisos
    .map(a => `<a href="${a.link}">${esc(a.texto)} <i class="bi bi-arrow-right"></i></a>`)
    .join('');

// ---------- 7) MENU DO USUÁRIO (abre ao clicar na foto) ----------
const btnUsuario = $('btnUsuario');
const menuUsuario = $('menuUsuario');

btnUsuario.addEventListener('click', e => {
    e.stopPropagation();                         // o clique não "sobe" e não fecha o menu na hora
    menuUsuario.hidden = !menuUsuario.hidden;    // "!" inverte: se estava fechado abre, se aberto fecha
});

document.addEventListener('click', () => {      // clicar em qualquer outro lugar fecha o menu
    menuUsuario.hidden = true;
});
