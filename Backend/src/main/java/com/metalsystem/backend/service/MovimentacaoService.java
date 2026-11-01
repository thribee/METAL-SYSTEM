package com.metalsystem.backend.service;
import com.metalsystem.backend.entity.Movimentacao;
import com.metalsystem.backend.dto.MovimentacaoRequest;
import com.metalsystem.backend.repository.MovimentacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@Service
public class MovimentacaoService {
 private final MovimentacaoRepository repo;
 public MovimentacaoService(MovimentacaoRepository repo){this.repo=repo;}
 public List<Movimentacao> listar(){return repo.findAll();}
 public Movimentacao buscar(Long id){return repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Registro não encontrado"));}
 public Movimentacao criar(MovimentacaoRequest r){Movimentacao e=new Movimentacao();copiar(e,r);return repo.save(e);}
 public Movimentacao atualizar(Long id,MovimentacaoRequest r){Movimentacao e=buscar(id);copiar(e,r);return repo.save(e);}
 public void excluir(Long id){repo.delete(buscar(id));}
 private void copiar(Movimentacao e,MovimentacaoRequest r){
  e.setTipo(r.tipo());
  e.setDescricao(r.descricao());
  e.setValor(r.valor());
  e.setData(r.data());
  e.setCategoria(r.categoria());
 }
}
