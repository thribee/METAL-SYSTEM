package com.metalsystem.backend.controller;
import com.metalsystem.backend.entity.*;import com.metalsystem.backend.repository.*;
import jakarta.validation.Valid;import jakarta.validation.constraints.*;import org.springframework.http.*;import org.springframework.transaction.annotation.Transactional;import org.springframework.web.bind.annotation.*;import org.springframework.web.server.ResponseStatusException;
import java.math.*;import java.util.*;
@RestController @RequestMapping("/api/orcamentos/{orcamentoId}/itens") public class ItemOrcamentoController {
 private final OrcamentoRepository orcamentos;private final ItemOrcamentoRepository itens;
 public ItemOrcamentoController(OrcamentoRepository o,ItemOrcamentoRepository i){orcamentos=o;itens=i;}
 public record Dados(@NotBlank String descricao,@NotNull @DecimalMin("0.01") BigDecimal quantidade,@NotNull @DecimalMin("0.00") BigDecimal valorUnitario){}
 public record Saida(Long id,String descricao,BigDecimal quantidade,BigDecimal valorUnitario,BigDecimal subtotal){}
 private Saida saida(ItemOrcamento i){return new Saida(i.getId(),i.getDescricao(),i.getQuantidade(),i.getValorUnitario(),i.getSubtotal());}
 @GetMapping public List<Saida> listar(@PathVariable Long orcamentoId){return itens.findByOrcamentoId(orcamentoId).stream().map(this::saida).toList();}
 @PostMapping @Transactional public Saida criar(@PathVariable Long orcamentoId,@Valid @RequestBody Dados d){var o=orcamentos.findById(orcamentoId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));if(o.getStatus()!=Orcamento.Status.AGUARDANDO)throw new ResponseStatusException(HttpStatus.CONFLICT,"Orçamento fechado");var i=new ItemOrcamento();i.setOrcamento(o);i.setDescricao(d.descricao());i.setQuantidade(d.quantidade());i.setValorUnitario(d.valorUnitario());i.setSubtotal(d.quantidade().multiply(d.valorUnitario()).setScale(2,RoundingMode.HALF_UP));i=itens.save(i);recalcular(o);return saida(i);}
 @DeleteMapping("/{itemId}") @Transactional public void excluir(@PathVariable Long orcamentoId,@PathVariable Long itemId){var o=orcamentos.findById(orcamentoId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));if(o.getStatus()!=Orcamento.Status.AGUARDANDO)throw new ResponseStatusException(HttpStatus.CONFLICT,"Orçamento fechado");var i=itens.findById(itemId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));if(!i.getOrcamento().getId().equals(orcamentoId))throw new ResponseStatusException(HttpStatus.NOT_FOUND);itens.delete(i);itens.flush();recalcular(o);}
 private void recalcular(Orcamento o){o.setValor(itens.findByOrcamentoId(o.getId()).stream().map(ItemOrcamento::getSubtotal).reduce(BigDecimal.ZERO,BigDecimal::add));orcamentos.save(o);}
}
