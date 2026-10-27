const btnEntrada = document.getElementById('btn-nova-entrada');
const btnSaida = document.getElementById('btn-nova-saida');

document.getElementById('tab-entradas').addEventListener('shown.bs.tab', () => {
    btnEntrada.classList.remove('d-none');
    btnSaida.classList.add('d-none');
});

document.getElementById('tab-saidas').addEventListener('shown.bs.tab', () => {
    btnSaida.classList.remove('d-none');
    btnEntrada.classList.add('d-none');
});
document.querySelectorAll('#aba-entradas tbody tr td:last-child button:first-child').forEach(btn => {
    btn.dataset.bsToggle = 'modal';
    btn.dataset.bsTarget = '#modalEditarEntrada';
});

document.querySelectorAll('#aba-saidas tbody tr td:last-child button:first-child').forEach(btn => {
    btn.dataset.bsToggle = 'modal';
    btn.dataset.bsTarget = '#modalEditarSaida';
});