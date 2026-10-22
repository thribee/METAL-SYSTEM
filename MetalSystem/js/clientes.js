(() => {
  const STORAGE_KEY = 'metalsystem_clientes_v1';
  const POR_PAGINA = 13;

  function gerarDadosIniciais() {
    const base = [
      ['João da Silva', '(34) 99999-9999'],
      ['Kleber Otavio', '(34) 99999-2324'],
      ['Matheus Filipe', '(34) 93599-9849'],
      ['Jorge Ribeiro', '(34) 99735-1629'],
      ['Gilberto Eustáquio', '(34) 92559-9539'],
      ['Maria Julia', '(34) 99616-2940'],
      ['Adailton Pinto', '(34) 99659-7025'],
      ['Roger Santiago', '(34) 93429-2930'],
      ['Luan Gomes', '(34) 97876-2299'],
      ['Gustavo Oliveira', '(34) 97766-9966'],
      ['Alan Santos', '(34) 99447-1023'],
      ['Pacheco Souza', '(34) 92459-7656'],
      ['Ricardo Dutra', '(34) 97858-2131'],
    ];
    const nomes = ['Ana','Bruno','Carlos','Daniela','Eduardo','Fernanda','Gabriel','Helena','Igor','Juliana','Lucas','Marcos','Natália','Otávio','Paulo','Rafaela','Sérgio','Tatiane','Vinícius','Wesley'];
    const sobrenomes = ['Almeida','Barbosa','Cardoso','Dias','Esteves','Ferreira','Gonçalves','Henrique','Lima','Martins','Nunes','Pereira','Ramos','Teixeira','Vieira'];
    const ruas = ['Rua das Flores','Av. Brasil','Rua Goiás','Av. Getúlio Vargas','Rua Minas Gerais','Rua São Paulo'];

    const agora = Date.now();
    const dia = 86400000;
    const lista = [];

    for (let i = 0; i < 130; i++) {
      let nome, telefone;
      if (i < base.length) {
        [nome, telefone] = base[i];
      } else {
        nome = `${nomes[(i * 7) % nomes.length]} ${sobrenomes[(i * 3) % sobrenomes.length]}`;
        const n1 = 90000 + ((i * 7919) % 9999);
        const n2 = 1000 + ((i * 104729) % 9000);
        telefone = `(34) 9${String(n1).slice(0, 4)}-${n2}`;
      }
      lista.push({
        id: i + 1,
        nome,
        telefone,
        email: nome.normalize('NFD').replace(/[\u0300-\u036f\s]/g, '') + '@gmail.com',
        idade: 20 + ((i * 11) % 50),
        endereco: `${ruas[i % ruas.length]}, ${10 + ((i * 13) % 900)} - Patos de Minas`,
        criadoEm: agora - i * dia,
      });
    }
    return lista;
  }

  function carregar() {
    try {
      const salvo = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(salvo)) return salvo;
    } catch (e) { /* ignora */ }
    return gerarDadosIniciais();
  }
  function salvar() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes)); } catch (e) { /* ignora */ }
  }

  let clientes = carregar();
  let paginaAtual = 1;
  let idParaExcluir = null;

  /* ---------- ELEMENTOS ---------- */
  const $ = (id) => document.getElementById(id);
  const tbody = $('tabelaClientes');
  const totalEl = $('totalClientes');
  const buscaEl = $('busca');
  const ordenarEl = $('ordenar');
  const infoEl = $('infoPaginacao');
  const pagEl = $('paginacao');

  const modalCliente = $('modalCliente');
  const modalExcluir = $('modalExcluir');
  const form = $('formCliente');
  const campos = {
    id: $('clienteId'),
    nome: $('nome'),
    email: $('email'),
    telefone: $('telefone'),
    idade: $('idade'),
    endereco: $('endereco'),
  };

  const ICON_EDIT = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
  const ICON_DEL = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1L5 6"/><path d="M10 11v6M14 11v6"/></svg>';

  /* ---------- UTIL ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function mascaraTelefone(v) {
    v = v.replace(/\D/g, '').slice(0, 11);
    if (v.length > 10) return v.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    if (v.length > 6) return v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    if (v.length > 2) return v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    return v ? `(${v}` : '';
  }

  let toastTimer;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }

  function filtrados() {
    const termo = buscaEl.value.trim().toLowerCase();
    let lista = clientes.filter((c) => c.nome.toLowerCase().includes(termo));
    switch (ordenarEl.value) {
      case 'antigos': lista.sort((a, b) => a.criadoEm - b.criadoEm); break;
      case 'az': lista.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')); break;
      case 'za': lista.sort((a, b) => b.nome.localeCompare(a.nome, 'pt-BR')); break;
      default: lista.sort((a, b) => b.criadoEm - a.criadoEm);
    }
    return lista;
  }

  function render() {
    const lista = filtrados();
    const totalPaginas = Math.max(1, Math.ceil(lista.length / POR_PAGINA));
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;

    const inicio = (paginaAtual - 1) * POR_PAGINA;
    const pagina = lista.slice(inicio, inicio + POR_PAGINA);

    totalEl.textContent = clientes.length;

    if (!pagina.length) {
      tbody.innerHTML = '<tr><td colspan="4" class="vazio">Nenhum cliente encontrado.</td></tr>';
    } else {
      tbody.innerHTML = pagina.map((c) => `
        <tr>
          <td>${esc(c.nome)}</td>
          <td>${esc(c.telefone)}</td>
          <td>${esc(c.email)}</td>
          <td>
            <div class="acoes">
              <button class="icon-btn" data-acao="editar" data-id="${c.id}" title="Editar" aria-label="Editar ${esc(c.nome)}">${ICON_EDIT}</button>
              <button class="icon-btn del" data-acao="excluir" data-id="${c.id}" title="Excluir" aria-label="Excluir ${esc(c.nome)}">${ICON_DEL}</button>
            </div>
          </td>
        </tr>`).join('');
    }

    const de = lista.length ? inicio + 1 : 0;
    const ate = inicio + pagina.length;
    infoEl.textContent = `Mostrando ${de} - ${ate} de ${lista.length} Clientes`;

    renderPaginacao(totalPaginas);
  }

  function renderPaginacao(total) {
    // janela de até 3 páginas visíveis
    let ini = Math.max(1, paginaAtual - 1);
    let fim = Math.min(total, ini + 2);
    ini = Math.max(1, fim - 2);

    let html = `<button data-pag="${paginaAtual - 1}" ${paginaAtual === 1 ? 'disabled' : ''}>&lt;</button>`;
    for (let p = ini; p <= fim; p++) {
      html += `<button data-pag="${p}" class="${p === paginaAtual ? 'active' : ''}">${p}</button>`;
    }
    html += `<button data-pag="${paginaAtual + 1}" ${paginaAtual === total ? 'disabled' : ''}>&gt;</button>`;
    pagEl.innerHTML = html;
  }

  function limparErros() {
    form.querySelectorAll('.field').forEach((f) => {
      f.classList.remove('invalid');
      f.querySelector('.erro').textContent = '';
    });
  }

  function abrirModal(cliente) {
    limparErros();
    form.reset();
    if (cliente) {
      $('modalTitulo').textContent = 'Editar Cliente';
      $('btnSalvar').textContent = 'Salvar alterações';
      campos.id.value = cliente.id;
      campos.nome.value = cliente.nome;
      campos.email.value = cliente.email;
      campos.telefone.value = cliente.telefone;
      campos.idade.value = cliente.idade;
      campos.endereco.value = cliente.endereco;
    } else {
      $('modalTitulo').textContent = 'Novo Cliente';
      $('btnSalvar').textContent = 'Cadastrar';
      campos.id.value = '';
    }
    modalCliente.classList.add('open');
    modalCliente.setAttribute('aria-hidden', 'false');
    setTimeout(() => campos.nome.focus(), 50);
  }

  function fecharModal() {
    modalCliente.classList.remove('open');
    modalCliente.setAttribute('aria-hidden', 'true');
  }

  function erro(campo, msg) {
    const f = campo.closest('.field');
    f.classList.add('invalid');
    f.querySelector('.erro').textContent = msg;
  }

  function validar() {
    limparErros();
    let ok = true;
    const nome = campos.nome.value.trim();
    const email = campos.email.value.trim();
    const tel = campos.telefone.value.replace(/\D/g, '');
    const idade = Number(campos.idade.value);
    const endereco = campos.endereco.value.trim();

    if (nome.length < 3) { erro(campos.nome, 'Informe o nome completo.'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { erro(campos.email, 'Informe um e-mail válido.'); ok = false; }
    if (tel.length < 10) { erro(campos.telefone, 'Informe um telefone válido.'); ok = false; }
    if (!campos.idade.value || !Number.isInteger(idade) || idade < 0 || idade > 120) { erro(campos.idade, 'Informe uma idade entre 0 e 120.'); ok = false; }
    if (endereco.length < 5) { erro(campos.endereco, 'Informe o endereço.'); ok = false; }
    return ok;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validar()) return;

    const dados = {
      nome: campos.nome.value.trim(),
      email: campos.email.value.trim(),
      telefone: campos.telefone.value.trim(),
      idade: Number(campos.idade.value),
      endereco: campos.endereco.value.trim(),
    };

    if (campos.id.value) {
      const c = clientes.find((x) => x.id === Number(campos.id.value));
      if (c) Object.assign(c, dados);
      toast('Cliente atualizado com sucesso!');
    } else {
      const novoId = clientes.reduce((m, c) => Math.max(m, c.id), 0) + 1;
      clientes.push({ id: novoId, ...dados, criadoEm: Date.now() });
      ordenarEl.value = 'recentes';
      buscaEl.value = '';
      paginaAtual = 1;
      toast('Cliente cadastrado com sucesso!');
    }

    salvar();
    fecharModal();
    render();
  });

  campos.telefone.addEventListener('input', () => {
    campos.telefone.value = mascaraTelefone(campos.telefone.value);
  });

  $('btnNovo').addEventListener('click', () => abrirModal(null));
  $('btnFechar').addEventListener('click', fecharModal);
  $('btnCancelar').addEventListener('click', fecharModal);
  modalCliente.addEventListener('mousedown', (e) => { if (e.target === modalCliente) fecharModal(); });

  function abrirExcluir(cliente) {
    idParaExcluir = cliente.id;
    $('nomeExcluir').textContent = cliente.nome;
    modalExcluir.classList.add('open');
    modalExcluir.setAttribute('aria-hidden', 'false');
  }
  function fecharExcluir() {
    modalExcluir.classList.remove('open');
    modalExcluir.setAttribute('aria-hidden', 'true');
    idParaExcluir = null;
  }

  $('btnConfirmarExcluir').addEventListener('click', () => {
    clientes = clientes.filter((c) => c.id !== idParaExcluir);
    salvar();
    fecharExcluir();
    render();
    toast('Cliente excluído.');
  });
  modalExcluir.querySelectorAll('[data-close-excluir]').forEach((b) => b.addEventListener('click', fecharExcluir));
  modalExcluir.addEventListener('mousedown', (e) => { if (e.target === modalExcluir) fecharExcluir(); });

  tbody.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-acao]');
    if (!btn) return;
    const cliente = clientes.find((c) => c.id === Number(btn.dataset.id));
    if (!cliente) return;
    if (btn.dataset.acao === 'editar') abrirModal(cliente);
    else abrirExcluir(cliente);
  });

  pagEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pag]');
    if (!b || b.disabled) return;
    paginaAtual = Number(b.dataset.pag);
    render();
  });

  buscaEl.addEventListener('input', () => { paginaAtual = 1; render(); });
  ordenarEl.addEventListener('change', () => { paginaAtual = 1; render(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { fecharModal(); fecharExcluir(); }
  });

  render();
})();
