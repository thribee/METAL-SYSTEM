package com.metalsystem.backend.controller;
import com.metalsystem.backend.service.FinanceiroService;
import com.metalsystem.backend.dto.*;
import com.metalsystem.backend.entity.*;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import java.time.LocalDate;
import java.util.*;
@RestController @RequestMapping("/api/financeiro")
public class FinanceiroController {
 private final FinanceiroService service;
 public FinanceiroController(FinanceiroService service){this.service=service;}
 @GetMapping("/contas") public List<ContaFinanceira> contas(){return service.listar();}
 @PostMapping("/contas") public ResponseEntity<ContaFinanceira> criar(@Valid @RequestBody ContaFinanceiraRequest r){return ResponseEntity.status(201).body(service.criar(r));}
 @GetMapping("/contas/{id}") public Map<String,Object> detalhe(@PathVariable Long id){return service.detalhe(id);}
 @PutMapping("/contas/{id}") public ContaFinanceira atualizar(@PathVariable Long id,@Valid @RequestBody ContaFinanceiraRequest r){return service.atualizar(id,r);}
 @PostMapping("/contas/{id}/cancelar") public ContaFinanceira cancelar(@PathVariable Long id){return service.cancelar(id);}
 @PostMapping("/contas/{id}/pagamentos") public ResponseEntity<PagamentoFinanceiro> pagar(@PathVariable Long id,@Valid @RequestBody PagamentoFinanceiroRequest r){return ResponseEntity.status(201).body(service.pagar(id,r));}
 @DeleteMapping("/contas/{id}/pagamentos/{pagamentoId}") public ResponseEntity<Void> estornar(@PathVariable Long id,@PathVariable Long pagamentoId){service.estornar(id,pagamentoId);return ResponseEntity.noContent().build();}
 @PostMapping("/orcamentos/{id}/conta-receber") public ContaFinanceira gerar(@PathVariable Long id,@RequestParam LocalDate vencimento){return service.gerarDoOrcamento(id,vencimento);}
 @GetMapping("/relatorio") public Map<String,Object> relatorio(@RequestParam LocalDate inicio,@RequestParam LocalDate fim){return service.relatorio(inicio,fim);}
}
