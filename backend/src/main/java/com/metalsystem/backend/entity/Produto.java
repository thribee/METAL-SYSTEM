package com.metalsystem.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity @Table(name="produtos")
public class Produto {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  private String nome;
  private Integer quantidade;
  private BigDecimal precoUnitario;
  private String unidade;
 public Long getId(){return id;}
 public String getNome(){return nome;} public void setNome(String value){this.nome=value;}
 public Integer getQuantidade(){return quantidade;} public void setQuantidade(Integer value){this.quantidade=value;}
 public BigDecimal getPrecoUnitario(){return precoUnitario;} public void setPrecoUnitario(BigDecimal value){this.precoUnitario=value;}
 public String getUnidade(){return unidade;} public void setUnidade(String value){this.unidade=value;}
 
}
