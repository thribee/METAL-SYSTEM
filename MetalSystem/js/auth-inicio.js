// Confirma a sessão no servidor e ativa o logout.
(async () => {
  const auth = sessionStorage.getItem('metal_auth');
  if (!auth) return;
  try {
    const resposta = await fetch('http://localhost:8080/api/auth/me', {
      headers: { Authorization: `Basic ${auth}` }, cache: 'no-store'
    });
    if (!resposta.ok) throw new Error('Sessão inválida');
    const usuario = await resposta.json();
    sessionStorage.setItem('metal_user', JSON.stringify(usuario));
  } catch (_) {
    sessionStorage.removeItem('metal_auth');
    sessionStorage.removeItem('metal_user');
    window.location.replace('index.html');
  }
})();
document.getElementById('sairSistema')?.addEventListener('click', () => {
  sessionStorage.removeItem('metal_auth');
  sessionStorage.removeItem('metal_user');
});
