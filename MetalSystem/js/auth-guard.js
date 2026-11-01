// Bloqueia a navegação para a página inicial quando não existe sessão.
if (!sessionStorage.getItem('metal_auth')) {
  window.location.replace('index.html');
}
