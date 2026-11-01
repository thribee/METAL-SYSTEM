package com.metalsystem.backend.controller;
import com.metalsystem.backend.entity.*;import com.metalsystem.backend.repository.*;
import jakarta.validation.Valid;import jakarta.validation.constraints.*;import org.springframework.http.*;import org.springframework.transaction.annotation.Transactional;import org.springframework.web.bind.annotation.*;import org.springframework.web.server.ResponseStatusException;
import java.util.*;
@RestController @RequestMapping("/api/estoque") public class EstoqueMovimentoController {
 private final ProdutoRepository produtos;private final MovimentoEstoqueRepository movimentos;
 public EstoqueMovimentoController(ProdutoRepository p,MovimentoEstoqueRepository m){produtos=p;movimentos=m;}
 public record Entrada(@NotNull Long produtoId,@NotNull MovimentoEstoque.Tipo tipo,@NotNull @Min(1) Integer quantidade,String motivo){}
 public record Movimento(Long id,Long produtoId,String produto,MovimentoEstoque.Tipo tipo,Integer quantidade,String motivo,java.time.LocalDateTime criadoEm){}
 @GetMapping("/movimentos") public List<Movimento> listar(){return movimentos.findAll().stream().map(m->new Movimento(m.getId(),m.getProduto().getId(),m.getProduto().getNome(),m.getTipo(),m.getQuantidade(),m.getMotivo(),m.getCriadoEm())).toList();}
 @PostMapping("/movimentos") @Transactional public Movimento criar(@Valid @RequestBody Entrada e){var p=produtos.findById(e.produtoId()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Produto inexistente"));int atual=p.getQuantidade()==null?0:p.getQuantidade();int novo=e.tipo()==MovimentoEstoque.Tipo.ENTRADA?atual+e.quantidade():atual-e.quantidade();if(novo<0)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Estoque insuficiente");p.setQuantidade(novo);produtos.save(p);var m=new MovimentoEstoque();m.setProduto(p);m.setTipo(e.tipo());m.setQuantidade(e.quantidade());m.setMotivo(e.motivo());m=movimentos.save(m);return new Movimento(m.getId(),p.getId(),p.getNome(),m.getTipo(),m.getQuantidade(),m.getMotivo(),m.getCriadoEm());}
 @GetMapping("/baixo") public List<Produto> baixo(@RequestParam(defaultValue="5") int limite){return produtos.findAll().stream().filter(p->p.getQuantidade()!=null&&p.getQuantidade()<=limite).toList();}
}
