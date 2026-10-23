const telaLista  = document.getElementById('tela-lista');
const telaNovo   = document.getElementById('tela-novo');
const telaEditar = document.getElementById('tela-editar');
const form       = document.getElementById('form-novo');

const labels = { aguardando: 'Aguardando', aprovado: 'Aprovado', recusado: 'Recusado' };

/* ========== TROCA DE TELAS ========== */
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

// botão "+ Novo Orçamento"
document.getElementById('btn-novo').addEventListener('click', mostrarNovo);

// seta de voltar, link do caminho e botão Cancelar
document.querySelectorAll('.voltar-lista').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        form.reset();
        mostrarLista();
    });
});

// Salvar (novo orçamento): por enquanto só limpa e volta para a lista
form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reset();
    mostrarLista();
});

/* ========== ABAS (Todos / Aguardando / Aprovados / Recusados) ========== */
const abas         = document.querySelectorAll('.aba');
const semResultado = document.getElementById('sem-resultado');
const infoTabela   = document.getElementById('info-tabela');

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

/* ========== DADOS DE EXEMPLO ========== */
// Dados extras de cada orçamento (a tabela não mostra tudo).
// Depois, isso virá do banco de dados.
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

/* ========== FUNÇÕES AUXILIARES ========== */
function moeda(n) {
    return 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// "5.200,00" -> 5200
function paraNumero(texto) {
    const n = parseFloat(String(texto).replace(/\./g, '').replace(',', '.'));
    return isNaN(n) ? 0 : n;
}

// evita quebrar o HTML se alguém digitar aspas ou < >
function escapar(texto) {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// troca só o nome na linha da tabela (sem apagar o botão do lápis)
function trocarNomeNaLinha(linha, novoNome) {
    const td = linha.cells[0];
    const textos = Array.from(td.childNodes).filter(function (n) { return n.nodeType === 3; });
    if (textos.length) {
        textos[textos.length - 1].textContent = novoNome;
    } else {
        td.append(novoNome);
    }
}

/* ========== EDITAR CLIENTE ========== */
let clienteEditando = false;
const camposCliente = ['nome', 'telefone', 'endereco'];

function preencherCliente() {
    const d = detalhes[nomeEmEdicao];
    document.getElementById('ed-cli-nome').textContent     = nomeEmEdicao;
    document.getElementById('ed-cli-telefone').textContent = d.telefone;
    document.getElementById('ed-cli-endereco').textContent = d.endereco;
}

function alternarCliente(editando) {
    clienteEditando = editando;
    camposCliente.forEach(function (c) {
        document.getElementById('ed-cli-' + c).hidden = editando;
        document.getElementById('in-cli-' + c).hidden  = !editando;
    });
    document.getElementById('cli-cancelar').hidden = !editando;
    document.getElementById('cli-editar').textContent = editando ? 'Salvar' : 'Editar';
}

function salvarCliente() {
    const d = detalhes[nomeEmEdicao];
    const novoNome = document.getElementById('in-cli-nome').value.trim() || nomeEmEdicao;

    d.telefone = document.getElementById('in-cli-telefone').value.trim();
    d.endereco = document.getElementById('in-cli-endereco').value.trim();

    if (novoNome !== nomeEmEdicao) {
        detalhes[novoNome] = d;
        delete detalhes[nomeEmEdicao];
        nomeEmEdicao = novoNome;
        trocarNomeNaLinha(linhaEmEdicao, novoNome);
        document.getElementById('ed-nome').textContent = novoNome;
    }

    preencherCliente();
    alternarCliente(false);
}

document.getElementById('cli-editar').addEventListener('click', function (e) {
    e.preventDefault();
    if (!clienteEditando) {
        const d = detalhes[nomeEmEdicao];
        document.getElementById('in-cli-nome').value     = nomeEmEdicao;
        document.getElementById('in-cli-telefone').value = d.telefone;
        document.getElementById('in-cli-endereco').value = d.endereco;
        alternarCliente(true);
    } else {
        salvarCliente();
    }
});

document.getElementById('cli-cancelar').addEventListener('click', function (e) {
    e.preventDefault();
    alternarCliente(false);
});

/* ========== EDITAR SERVIÇOS ========== */
let servicosEditando = false;
const corpoItens = document.getElementById('ed-itens');

// desenha a tabela de serviços (editando = true mostra campos)
function renderItens(itens, editando) {
    let soma = 0;

    corpoItens.innerHTML = itens.map(function (item) {
        const subtotal = item.qtd * item.valor;
        soma += subtotal;

        if (!editando) {
            return '<tr>' +
                '<td>' + escapar(item.descricao) + '</td>' +
                '<td>' + item.qtd + '</td>' +
                '<td>' + moeda(item.valor) + '</td>' +
                '<td>' + moeda(subtotal) + '</td>' +
                '<td class="col-remover"></td>' +
                '</tr>';
        }

        return '<tr>' +
            '<td><input type="text" class="campo campo-tabela in-desc" value="' + escapar(item.descricao) + '" placeholder="Descrição"></td>' +
            '<td><input type="number" min="1" class="campo campo-tabela in-qtd" value="' + item.qtd + '"></td>' +
            '<td><input type="text" class="campo campo-tabela in-valor" value="' +
                item.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '"></td>' +
            '<td class="sub">' + moeda(subtotal) + '</td>' +
            '<td class="col-remover"><button type="button" class="btn-remover-item" title="Remover item">✕</button></td>' +
            '</tr>';
    }).join('');

    document.getElementById('ed-total').textContent = moeda(soma);
}

// lê os campos da tabela e devolve a lista de itens
function lerItens(manterVazios) {
    const itens = [];
    corpoItens.querySelectorAll('tr').forEach(function (tr) {
        const descricao = tr.querySelector('.in-desc').value.trim();
        const qtd       = parseInt(tr.querySelector('.in-qtd').value, 10) || 1;
        const valor     = paraNumero(tr.querySelector('.in-valor').value);
        if (descricao || manterVazios) {
            itens.push({ descricao: descricao, qtd: qtd, valor: valor });
        }
    });
    return itens;
}

// recalcula subtotais e total enquanto digita
function recalcularTotal() {
    let soma = 0;
    corpoItens.querySelectorAll('tr').forEach(function (tr) {
        const qtd      = parseInt(tr.querySelector('.in-qtd').value, 10) || 0;
        const valor    = paraNumero(tr.querySelector('.in-valor').value);
        const subtotal = qtd * valor;
        soma += subtotal;
        tr.querySelector('.sub').textContent = moeda(subtotal);
    });
    document.getElementById('ed-total').textContent = moeda(soma);
}

function alternarServicos(editando) {
    servicosEditando = editando;
    document.getElementById('ed-tabela').classList.toggle('editando', editando);
    document.getElementById('srv-add').hidden      = !editando;
    document.getElementById('srv-cancelar').hidden = !editando;
    document.getElementById('srv-editar').textContent = editando ? 'Salvar' : 'Editar';
}

function salvarServicos() {
    const itens = lerItens(false);

    if (itens.length === 0) {
        alert('Adicione pelo menos um serviço.');
        return;
    }

    detalhes[nomeEmEdicao].itens = itens;

    const total = itens.reduce(function (s, i) { return s + i.qtd * i.valor; }, 0);

    // atualiza a linha da lista (coluna Serviços e coluna Valor)
    linhaEmEdicao.cells[1].textContent = itens.map(function (i) { return i.descricao; }).join(' + ');
    linhaEmEdicao.cells[2].textContent = 'R$ ' + total.toLocaleString('pt-BR');

    renderItens(itens, false);
    alternarServicos(false);
}

document.getElementById('srv-editar').addEventListener('click', function (e) {
    e.preventDefault();
    if (!servicosEditando) {
        renderItens(detalhes[nomeEmEdicao].itens, true);
        alternarServicos(true);
    } else {
        salvarServicos();
    }
});

document.getElementById('srv-cancelar').addEventListener('click', function (e) {
    e.preventDefault();
    renderItens(detalhes[nomeEmEdicao].itens, false);
    alternarServicos(false);
});

// "+ Adicionar item"
document.getElementById('srv-add').addEventListener('click', function () {
    const itens = lerItens(true);
    itens.push({ descricao: '', qtd: 1, valor: 0 });
    renderItens(itens, true);
    corpoItens.querySelector('tr:last-child .in-desc').focus();
});

// recalcula o total ao digitar
corpoItens.addEventListener('input', function () {
    if (servicosEditando) recalcularTotal();
});

// botão ✕ para remover um item
corpoItens.addEventListener('click', function (e) {
    const botao = e.target.closest('.btn-remover-item');
    if (!botao) return;
    botao.closest('tr').remove();
    recalcularTotal();
});

/* ========== ABRIR A TELA DE EDIÇÃO (clique no lápis) ========== */
function abrirEditar(linha) {
    const cel     = linha.cells;
    const nome    = cel[0].textContent.trim();
    const servico = cel[1].textContent.trim();
    const total   = parseInt(cel[2].textContent.replace(/\D/g, ''), 10);
    const data    = cel[3].textContent.trim();
    const status  = linha.dataset.status;

    // se não tiver detalhes cadastrados, monta o básico com o que a tabela mostra
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

    // topo
    document.getElementById('ed-nome').textContent   = nome;
    document.getElementById('ed-aberto').textContent = 'Orçamento aberto em ' + data;
    const pill = document.getElementById('ed-pill');
    pill.textContent = labels[status];
    pill.className   = 'pill pill-' + status;

    // cliente e serviços (sempre abrem no modo visualização)
    preencherCliente();
    alternarCliente(false);
    renderItens(d.itens, false);
    alternarServicos(false);

    // condições
    document.getElementById('ed-validade').textContent = d.validade;
    document.getElementById('ed-prazo').textContent    = d.prazo;
    document.getElementById('ed-st-' + status).checked = true;
    document.getElementById('ed-obs').value            = d.obs;

    mostrarTela(telaEditar);
}

// clique no lápis de qualquer linha
document.querySelector('.tabela-orcamentos tbody').addEventListener('click', function (e) {
    const botao = e.target.closest('.btn-editar');
    if (!botao) return;
    abrirEditar(botao.closest('tr'));
});

/* ========== SALVAR ALTERAÇÕES E EXCLUIR ========== */
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