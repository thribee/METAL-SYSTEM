// Autenticação HTTP Basic da API Spring Boot (ambiente de desenvolvimento).
const form = document.getElementById('formLogin');
const erro = document.getElementById('erro');
const botao = document.getElementById('botaoEntrar');
if (sessionStorage.getItem('metal_auth')) {
  window.location.replace('inicio.html');
}
form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  erro.hidden = true;
  const login = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value;
  if (!login || !senha) {
    erro.textContent = 'Informe seu usuário e sua senha.';
    erro.hidden = false;
    return;
  }
  botao.disabled = true;
  botao.textContent = 'Entrando...';
  try {
    const bytes = new TextEncoder().encode(`${login}:${senha}`);
    let binary = '';
    for (const byte of bytes) binary += String.fromCharCode(byte);
    const token = btoa(binary);
    const resposta = await fetch('http://localhost:8080/api/auth/me', {
      headers: { Authorization: `Basic ${token}` },
      cache: 'no-store'
    });
    if (!resposta.ok) {
      throw new Error(resposta.status === 401 ? 'Usuário ou senha inválidos.' :
        `Falha na autenticação (HTTP ${resposta.status}).`);
    }
    const usuario = await resposta.json();
    sessionStorage.setItem('metal_auth', token);
    sessionStorage.setItem('metal_user', JSON.stringify(usuario));
    window.location.replace('inicio.html');
  } catch (falha) {
    erro.textContent = falha instanceof TypeError
      ? 'Não foi possível conectar ao Spring Boot. Verifique se ele está ligado na porta 8080.'
      : falha.message;
    erro.hidden = false;
  } finally {
    botao.disabled = false;
    botao.textContent = 'Entrar';
  }
});
