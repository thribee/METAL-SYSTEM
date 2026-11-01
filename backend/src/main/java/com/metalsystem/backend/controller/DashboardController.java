package com.metalsystem.backend.controller;
import com.metalsystem.backend.repository.*;
import com.metalsystem.backend.entity.Movimentacao;
import java.math.BigDecimal;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/dashboard")
public class DashboardController {
 private final ClienteRepository clientes;
 private final MovimentacaoRepository movimentos;
 private final DespesaRepository despesas;
 private final ProdutoRepository produtos;
 private final OrcamentoRepository orcamentos;
 public DashboardController(ClienteRepository c, MovimentacaoRepository m, DespesaRepository d, ProdutoRepository p, OrcamentoRepository o){clientes=c;movimentos=m;despesas=d;produtos=p;orcamentos=o;}
 @GetMapping public Map<String,Object> resumo(){
  BigDecimal entradas=BigDecimal.ZERO,saidas=BigDecimal.ZERO;
  for(var m:movimentos.findAll()) {if(m.getTipo()==Movimentacao.Tipo.ENTRADA) entradas=entradas.add(m.getValor());else saidas=saidas.add(m.getValor());}
  return Map.of("clientes",clientes.count(),"produtos",produtos.count(),"orcamentos",orcamentos.count(),"despesas",despesas.count(),"entradas",entradas,"saidas",saidas,"saldo",entradas.subtract(saidas));
 }
}
