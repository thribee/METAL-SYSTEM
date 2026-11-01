
window.MetalUI = {
  money: v => Number(v || 0).toLocaleString('pt-BR', {style:'currency',currency:'BRL'}),
  date: v => v ? String(v).slice(0,10).split('-').reverse().join('/') : '—',
  today: () => new Date().toLocaleDateString('en-CA'),
  node: (tag, value) => {const el=document.createElement(tag);el.textContent=String(value ?? '');return el;},
  error: e => {console.error(e); alert('Não foi possível comunicar com o Spring Boot: '+e.message);},
  empty: (tbody, colspan) => {const tr=document.createElement('tr'),td=document.createElement('td');td.colSpan=colspan;td.textContent='Nenhum registro cadastrado.';tr.append(td);tbody.append(tr);},
  cell: (tr, value) => tr.append(window.MetalUI.node('td',value)),
  button: (tr,label,callback) => {const td=document.createElement('td'),b=document.createElement('button');b.type='button';b.className='btn btn-sm btn-outline-secondary';b.textContent=label;b.addEventListener('click',callback);td.append(b);tr.append(td);}
};
