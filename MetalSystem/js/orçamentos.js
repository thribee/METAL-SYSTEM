const telaLista  = document.getElementById('tela-lista');
const telaNovo   = document.getElementById('tela-novo');
const telaEditar = document.getElementById('tela-editar');
const form       = document.getElementById('form-novo');

const labels = { aguardando: 'Aguardando', aprovado: 'Aprovado', recusado: 'Recusado' };

function mostrarTela(tela) {
    [telaLista, telaNovo, telaEditar].forEach(function (t) {
        t.hidden = (t !== tela);
    });
    window.scrollTo(0, 0);
}

function mostrarLista() {
    mostrarTela(telaLista);
}

function mostrarNovo() {
    document.getElementById('data-abertura').valueAsDate = new Date();
    mostrarTela(telaNovo);
}

document.getElementById('btn-novo').addEventListener('click', mostrarNovo);

document.querySelectorAll('.voltar-lista').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        form.reset();
        mostrarLista();
    });
});

form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reset();
    mostrarLista();
});

const abas        = document.querySelectorAll('.aba');
const semResultado = document.getElementById('sem-resultado');
const infoTabela  = document.getElementById('info-tabela');

function filtrarPor(filtro) {
    const linhas = document.querySelectorAll('.tabela-orcamentos tbody tr');
    let visiveis = 0;

    linhas.forEach(function (linha) {
        const mostrar = (filtro === 'todos') || (linha.dataset.status === filtro);
        linha.hidden = !mostrar;
        if (mostrar) visiveis++;
    });

    semResultado.hidden = visiveis > 0;
    infoTabela.textContent = 'Mostrando ' + (visiveis > 0 ? '1–' : '') + visiveis +
        ' de ' + document.querySelector('.aba.ativa .contador').textContent + ' orçamentos';
}

abas.forEach(function (aba) {
    aba.addEventListener('click', function () {
        abas.forEach(function (a) { a.classList.remove('ativa'); });
        aba.classList.add('ativa');
        filtrarPor(aba.dataset.filtro);
    });
});

function atualizarFiltroAtual() {
    filtrarPor(document.querySelector('.aba.ativa').dataset.filtro);
}


const detalhes = {
    'Augusto Silva Thibeco': {
        telefone: '(00) 00000-0000',
        endereco: 'Rua das Palmeiras, 210 — Patrocínio, MG',
        itens: [
            { descricao: 'Portão basculante 3x2,20m', qtd: 1, valor: 5200 },
            { descricao: 'Pintura eletrostática',     qtd: 1, valor: 700 }
        ],
        validade: '14/10/2026',
        prazo: '10 dias úteis',
        obs: '50% de entrada, 50% na entrega. Garantia de 12 meses para estrutura e pintura.'
    }
};

let linhaEmEdicao = null;
let nomeEmEdicao  = '';

function moeda(n) {
    return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function abrirEditar(linha) {
    const cel      = linha.cells;
    const nome     = cel[0].textContent.trim();
    const servico  = cel[1].textContent.trim();
    const total    = parseInt(cel[2].textContent.replace(/\D/g, ''), 10);
    const data     = cel[3].textContent.trim();
    const status   = linha.dataset.status;

    if (!detalhes[nome]) {
        detalhes[nome] = {
            telefone: '(00) 00000-0000',
            endereco: '—',
            itens: [{ descricao: servico, qtd: 1, valor: total }],
            validade: '—',
            prazo: '—',
            obs: ''
        };
    }
    const d = detalhes[nome];

    linhaEmEdicao = linha;
    nomeEmEdicao  = nome;

    document.getElementById('ed-nome').textContent   = nome;
    document.getElementById('ed-aberto').textContent = 'Orçamento aberto em ' + data;
    const pill = document.getElementById('ed-pill');
    pill.textContent = labels[status];
    pill.className   = 'pill pill-' + status;

    document.getElementById('ed-cli-nome').textContent     = nome;
    document.getElementById('ed-cli-telefone').textContent = d.telefone;
    document.getElementById('ed-cli-endereco').textContent = d.endereco;

    let soma = 0;
    document.getElementById('ed-itens').innerHTML = d.itens.map(function (item) {
        const subtotal = item.qtd * item.valor;
        soma += subtotal;
        return '<tr>' +
            '<td>' + item.descricao + '</td>' +
            '<td>' + item.qtd + '</td>' +
            '<td>' + moeda(item.valor) + '</td>' +
            '<td>' + moeda(subtotal) + '</td>' +
            '</tr>';
    }).join('');
    document.getElementById('ed-total').textContent = moeda(soma);

    // condições
    document.getElementById('ed-validade').textContent = d.validade;
    document.getElementById('ed-prazo').textContent    = d.prazo;
    document.getElementById('ed-st-' + status).checked = true;
    document.getElementById('ed-obs').value            = d.obs;

    mostrarTela(telaEditar);
}

document.querySelector('.tabela-orcamentos tbody').addEventListener('click', function (e) {
    const botao = e.target.closest('.btn-editar');
    if (!botao) return;
    abrirEditar(botao.closest('tr'));
});

document.getElementById('btn-salvar-edicao').addEventListener('click', function () {
    const novoStatus = document.querySelector('input[name="status-edit"]:checked').value;

    detalhes[nomeEmEdicao].obs = document.getElementById('ed-obs').value;

    linhaEmEdicao.dataset.status = novoStatus;
    const selo = linhaEmEdicao.querySelector('td:last-child span');
    selo.className   = 'status-' + novoStatus;
    selo.textContent = labels[novoStatus];

    mostrarLista();
    atualizarFiltroAtual();
});

document.getElementById('btn-excluir').addEventListener('click', function () {
    if (confirm('Tem certeza que deseja excluir este orçamento?')) {
        linhaEmEdicao.remove();
        mostrarLista();
        atualizarFiltroAtual();
    }
});