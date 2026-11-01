package com.metalsystem.backend.service;
import com.metalsystem.backend.entity.Despesa;
import com.metalsystem.backend.dto.DespesaRequest;
import com.metalsystem.backend.repository.DespesaRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@Service
public class DespesaService {
 private final DespesaRepository repo;
 public DespesaService(DespesaRepository repo){this.repo=repo;}
 public List<Despesa> listar(){return repo.findAll();}
 public Despesa buscar(Long id){return repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Registro não encontrado"));}
 public Despesa criar(DespesaRequest r){Despesa e=new Despesa();copiar(e,r);return repo.save(e);}
 public Despesa atualizar(Long id,DespesaRequest r){Despesa e=buscar(id);copiar(e,r);return repo.save(e);}
 public void excluir(Long id){repo.delete(buscar(id));}
 private void copiar(Despesa e,DespesaRequest r){
  e.setDescricao(r.descricao());
  e.setValor(r.valor());
  e.setVencimento(r.vencimento());
  e.setCategoria(r.categoria());
  e.setPaga(r.paga());
 }
}
