package com.metalsystem.backend.service;
import com.metalsystem.backend.entity.Produto;
import com.metalsystem.backend.dto.ProdutoRequest;
import com.metalsystem.backend.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
@Service
public class ProdutoService {
 private final ProdutoRepository repo;
 public ProdutoService(ProdutoRepository repo){this.repo=repo;}
 public List<Produto> listar(){return repo.findAll();}
 public Produto buscar(Long id){return repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Registro não encontrado"));}
 public Produto criar(ProdutoRequest r){Produto e=new Produto();copiar(e,r);return repo.save(e);}
 public Produto atualizar(Long id,ProdutoRequest r){Produto e=buscar(id);copiar(e,r);return repo.save(e);}
 public void excluir(Long id){repo.delete(buscar(id));}
 private void copiar(Produto e,ProdutoRequest r){
  e.setNome(r.nome());
  e.setQuantidade(r.quantidade());
  e.setPrecoUnitario(r.precoUnitario());
  e.setUnidade(r.unidade());
 }
}
