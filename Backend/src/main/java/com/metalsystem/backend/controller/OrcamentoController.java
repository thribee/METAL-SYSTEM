package com.metalsystem.backend.controller;
import com.metalsystem.backend.entity.Orcamento;
import com.metalsystem.backend.dto.OrcamentoRequest;
import com.metalsystem.backend.service.OrcamentoService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/orcamentos")
public class OrcamentoController {
 private final OrcamentoService service;
 public OrcamentoController(OrcamentoService service){this.service=service;}
 @GetMapping public List<Orcamento> listar(){return service.listar();}
 @GetMapping("/{id}") public Orcamento buscar(@PathVariable Long id){return service.buscar(id);}
 @PostMapping public ResponseEntity<Orcamento> criar(@Valid @RequestBody OrcamentoRequest r){Orcamento e=service.criar(r);return ResponseEntity.created(URI.create("/api/orcamentos/"+e.getId())).body(e);}
 @PutMapping("/{id}") public Orcamento atualizar(@PathVariable Long id,@Valid @RequestBody OrcamentoRequest r){return service.atualizar(id,r);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> excluir(@PathVariable Long id){service.excluir(id);return ResponseEntity.noContent().build();}
}
