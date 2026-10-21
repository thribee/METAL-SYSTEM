const form = document.getElementById('formLogin');
const erro = document.getElementById('erro');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  erro.hidden = true;

  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value;

  // TEMPORÁRIO: só para testar a tela.
  // Quando o back-end existir, troque este bloco pela verificação real.
  if (usuario && senha) {
    window.location.href = 'index.html';
  } else {
    erro.hidden = false;
  }
});
