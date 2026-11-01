package com.metalsystem.backend.entity;
import jakarta.persistence.*;import java.time.LocalDateTime;
@Entity @Table(name="movimentos_estoque") public class MovimentoEstoque {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(optional=false) private Produto produto;
 @Enumerated(EnumType.STRING) private Tipo tipo;
 private Integer quantidade;private String motivo;private LocalDateTime criadoEm=LocalDateTime.now();
 public enum Tipo{ENTRADA,SAIDA}
 public Long getId(){return id;} public Produto getProduto(){return produto;} public void setProduto(Produto v){produto=v;}
 public Tipo getTipo(){return tipo;}public void setTipo(Tipo v){tipo=v;}
 public Integer getQuantidade(){return quantidade;}public void setQuantidade(Integer v){quantidade=v;}
 public String getMotivo(){return motivo;}public void setMotivo(String v){motivo=v;}
 public LocalDateTime getCriadoEm(){return criadoEm;}
}
