package com.metalsystem.backend.controller;
import com.metalsystem.backend.entity.Despesa;
import com.metalsystem.backend.dto.DespesaRequest;
import com.metalsystem.backend.service.DespesaService;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/despesas")
public class DespesaController {
 private final DespesaService service;
 public DespesaController(DespesaService service){this.service=service;}
 @GetMapping public List<Despesa> listar(){return service.listar();}
 @GetMapping("/{id}") public Despesa buscar(@PathVariable Long id){return service.buscar(id);}
 @PostMapping public ResponseEntity<Despesa> criar(@Valid @RequestBody DespesaRequest r){Despesa e=service.criar(r);return ResponseEntity.created(URI.create("/api/despesas/"+e.getId())).body(e);}
 @PutMapping("/{id}") public Despesa atualizar(@PathVariable Long id,@Valid @RequestBody DespesaRequest r){return service.atualizar(id,r);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> excluir(@PathVariable Long id){service.excluir(id);return ResponseEntity.noContent().build();}
}
