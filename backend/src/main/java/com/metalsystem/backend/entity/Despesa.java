package com.metalsystem.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity @Table(name="despesas")
public class Despesa {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  private String descricao;
  private BigDecimal valor;
  private LocalDate vencimento;
  private String categoria;
  private boolean paga;
 public Long getId(){return id;}
 public String getDescricao(){return descricao;} public void setDescricao(String value){this.descricao=value;}
 public BigDecimal getValor(){return valor;} public void setValor(BigDecimal value){this.valor=value;}
 public LocalDate getVencimento(){return vencimento;} public void setVencimento(LocalDate value){this.vencimento=value;}
 public String getCategoria(){return categoria;} public void setCategoria(String value){this.categoria=value;}
 public boolean getPaga(){return paga;} public void setPaga(boolean value){this.paga=value;}
 
}
