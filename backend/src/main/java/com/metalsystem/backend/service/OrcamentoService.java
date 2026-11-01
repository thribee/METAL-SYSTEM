package com.metalsystem.backend.service;
import com.metalsystem.backend.entity.Orcamento;
import com.metalsystem.backend.dto.OrcamentoRequest;
import com.metalsystem.backend.repository.OrcamentoRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@Service
public class OrcamentoService {
 private final OrcamentoRepository repo;
 private final com.metalsystem.backend.repository.ItemOrcamentoRepository itens;
 public OrcamentoService(OrcamentoRepository repo,com.metalsystem.backend.repository.ItemOrcamentoRepository itens){this.repo=repo;this.itens=itens;}
 public List<Orcamento> listar(){return repo.findAll();}
 public Orcamento buscar(Long id){return repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Registro não encontrado"));}
 public Orcamento criar(OrcamentoRequest r){Orcamento e=new Orcamento();copiar(e,r);return repo.save(e);}
 public Orcamento atualizar(Long id,OrcamentoRequest r){Orcamento e=buscar(id);copiar(e,r);return repo.save(e);}
 @org.springframework.transaction.annotation.Transactional public void excluir(Long id){Orcamento o=buscar(id);itens.deleteAll(itens.findByOrcamentoId(id));repo.delete(o);}
 private void copiar(Orcamento e,OrcamentoRequest r){
  e.setDescricao(r.descricao());
  e.setValor(r.valor());
  e.setData(r.data());
  e.setStatus(r.status());
  e.setClienteId(r.clienteId());
 }
}
