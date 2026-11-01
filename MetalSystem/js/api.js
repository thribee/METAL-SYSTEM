// Cliente HTTP compartilhado: outros módulos podem migrar do mock para a API.
window.MetalAPI = {
  base: 'http://localhost:8080/api',
  async request(caminho, opcoes = {}) {
    const auth = sessionStorage.getItem('metal_auth');
    const resposta = await fetch(this.base + caminho, {
      ...opcoes, headers: {...(!(opcoes.body instanceof FormData) ? {'Content-Type':'application/json'} : {}), ...(auth ? {Authorization:'Basic '+auth} : {}), ...(opcoes.headers || {})}
    });
    if (resposta.status === 401) { sessionStorage.removeItem('metal_auth'); window.location.href='index.html'; throw new Error('Sessão expirada'); }
    if (!resposta.ok) throw new Error(`API ${resposta.status}: ${await resposta.text()}`);
    return resposta.status === 204 ? null : resposta.json();
  },
  async baixarAnexo(id) {
    const auth=sessionStorage.getItem('metal_auth');
    const resposta=await fetch(this.base+'/documentos/'+id+'/anexo',{headers:auth?{Authorization:'Basic '+auth}:{}});
    if(!resposta.ok)throw new Error('Não foi possível baixar o anexo ('+resposta.status+')');
    return resposta.blob();
  },
  listar(caminho) {return this.request(caminho);},
  criar(caminho, dados) {return this.request(caminho, {method:'POST',body:JSON.stringify(dados)});},
  atualizar(caminho, id, dados) {return this.request(`${caminho}/${id}`, {method:'PUT',body:JSON.stringify(dados)});},
  excluir(caminho, id) {return this.request(`${caminho}/${id}`, {method:'DELETE'});}
};
