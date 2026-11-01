// Documentos e anexos enviados ao Spring Boot.
(() => {
 const $=id=>document.getElementById(id), tbody=$('documentos-tbody'), form=$('form-documento');
 const fmt=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(Number(v||0));
 const data=v=>v?new Date(v+'T12:00:00').toLocaleDateString('pt-BR'):'-';
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let docs=[];
 function render(){
  const busca=($('buscar')?.value||'').toLowerCase(), tipo=$('tipo')?.value||'', de=$('de')?.value||'', ate=$('ate')?.value||'';
  const lista=docs.filter(d=>(!busca||[d.cliente,d.numero,d.pedido].some(v=>String(v||'').toLowerCase().includes(busca)))&&(!tipo||d.tipo===tipo)&&(!de||d.data>=de)&&(!ate||d.data<=ate));
  $('total-documentos').textContent=String(docs.length);
  tbody.replaceChildren();
  if(!lista.length){const tr=document.createElement('tr');tr.innerHTML='<td colspan="8" class="text-center">Nenhum documento encontrado.</td>';tbody.append(tr);return;}
  lista.forEach(d=>{const tr=document.createElement('tr');tr.innerHTML=`<td>${data(d.data)}</td><td>${escape(d.numero)}</td><td>${escape(d.cliente)}</td><td>${escape(d.pedido)}</td><td>${escape(d.tipo)}</td><td>${fmt(d.valor)}</td><td>${d.anexoNome?escape(d.anexoNome):"Sem anexo"}</td><td class="acoes"><button type="button" class="btn-mini" data-view="${d.id}">Ver</button><button type="button" class="btn-mini" data-delete="${d.id}">Excluir</button></td>`;tbody.append(tr);});
 }
 async function carregar(){try{docs=await MetalAPI.listar('/documentos');render();}catch(e){tbody.innerHTML='<tr><td colspan="8">Erro ao consultar API. Verifique o Spring Boot.</td></tr>';console.error(e);}}
 form.addEventListener('submit',async e=>{e.preventDefault();const valor=Number($('doc-valor').value);const d={data:$('doc-data').value,numero:$('doc-numero').value.trim(),cliente:$('doc-cliente').value.trim(),pedido:$('doc-pedido').value.trim(),valor,tipo:$('doc-tipo').value};if(!d.data||!d.numero||!d.cliente||!d.tipo||!Number.isFinite(valor)||valor<0){alert('Preencha os campos obrigatórios.');return;}try{const criado=await MetalAPI.criar('/documentos',d);const arquivo=$('doc-anexo').files[0];if(arquivo){if(arquivo.size>5*1024*1024)throw new Error('Anexo maior que 5 MB');const fd=new FormData();fd.append('arquivo',arquivo);await MetalAPI.request('/documentos/'+criado.id+'/anexo',{method:'POST',body:fd});}form.reset();bootstrap.Modal.getInstance($('modalNovoDocumento'))?.hide();await carregar();}catch(err){alert('Não foi possível salvar: '+err.message);}});
 tbody.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;const id=Number(b.dataset.delete||b.dataset.view),d=docs.find(x=>x.id===id);if(!d)return;if(b.dataset.view){if(d.anexoNome){try{const blob=await MetalAPI.baixarAnexo(id);const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=d.anexoNome;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}catch(err){alert(err.message)}}else alert('Documento sem anexo.');return;}if(!confirm('Excluir documento '+d.numero+'?'))return;try{await MetalAPI.excluir('/documentos',id);await carregar();}catch(err){alert(err.message);}});
 document.querySelectorAll('.filtros input,.filtros select').forEach(el=>el.addEventListener('input',render));
 document.querySelector('.filtros')?.addEventListener('reset',()=>setTimeout(render,0));
 carregar();
})();
