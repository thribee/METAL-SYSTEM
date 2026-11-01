package com.metalsystem.backend.controller;
import com.metalsystem.backend.entity.Produto;
import com.metalsystem.backend.dto.ProdutoRequest;
import com.metalsystem.backend.service.ProdutoService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/estoque/produtos")
public class ProdutoController {
 private final ProdutoService service;
 public ProdutoController(ProdutoService service){this.service=service;}
 @GetMapping public List<Produto> listar(){return service.listar();}
 @GetMapping("/{id}") public Produto buscar(@PathVariable Long id){return service.buscar(id);}
 @PostMapping public ResponseEntity<Produto> criar(@Valid @RequestBody ProdutoRequest r){Produto e=service.criar(r);return ResponseEntity.created(URI.create("/api/estoque/produtos/"+e.getId())).body(e);}
 @PutMapping("/{id}") public Produto atualizar(@PathVariable Long id,@Valid @RequestBody ProdutoRequest r){return service.atualizar(id,r);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> excluir(@PathVariable Long id){service.excluir(id);return ResponseEntity.noContent().build();}
}
