package com.metalsystem.backend.entity;
import jakarta.persistence.*;import java.math.BigDecimal;
@Entity @Table(name="itens_orcamento") public class ItemOrcamento {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(optional=false) private Orcamento orcamento;
 private String descricao;private BigDecimal quantidade;private BigDecimal valorUnitario;private BigDecimal subtotal;
 public Long getId(){return id;}public Orcamento getOrcamento(){return orcamento;}public void setOrcamento(Orcamento v){orcamento=v;}
 public String getDescricao(){return descricao;}public void setDescricao(String v){descricao=v;}
 public BigDecimal getQuantidade(){return quantidade;}public void setQuantidade(BigDecimal v){quantidade=v;}
 public BigDecimal getValorUnitario(){return valorUnitario;}public void setValorUnitario(BigDecimal v){valorUnitario=v;}
 public BigDecimal getSubtotal(){return subtotal;}public void setSubtotal(BigDecimal v){subtotal=v;}
}
