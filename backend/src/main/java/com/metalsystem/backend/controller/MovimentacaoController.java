package com.metalsystem.backend.controller;
import com.metalsystem.backend.entity.Movimentacao;
import com.metalsystem.backend.dto.MovimentacaoRequest;
import com.metalsystem.backend.service.MovimentacaoService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/movimentacoes")
public class MovimentacaoController {
 private final MovimentacaoService service;
 public MovimentacaoController(MovimentacaoService service){this.service=service;}
 @GetMapping public List<Movimentacao> listar(){return service.listar();}
 @GetMapping("/{id}") public Movimentacao buscar(@PathVariable Long id){return service.buscar(id);}
 @PostMapping public ResponseEntity<Movimentacao> criar(@Valid @RequestBody MovimentacaoRequest r){Movimentacao e=service.criar(r);return ResponseEntity.created(URI.create("/api/movimentacoes/"+e.getId())).body(e);}
 @PutMapping("/{id}") public Movimentacao atualizar(@PathVariable Long id,@Valid @RequestBody MovimentacaoRequest r){return service.atualizar(id,r);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> excluir(@PathVariable Long id){service.excluir(id);return ResponseEntity.noContent().build();}
}
