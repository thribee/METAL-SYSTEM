package com.metalsystem.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity @Table(name="movimentacoes")
public class Movimentacao {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  @Enumerated(EnumType.STRING) private Tipo tipo;
  private String descricao;
  private BigDecimal valor;
  private LocalDate data;
  private String categoria;
 public Long getId(){return id;}
 public Tipo getTipo(){return tipo;} public void setTipo(Tipo value){this.tipo=value;}
 public String getDescricao(){return descricao;} public void setDescricao(String value){this.descricao=value;}
 public BigDecimal getValor(){return valor;} public void setValor(BigDecimal value){this.valor=value;}
 public LocalDate getData(){return data;} public void setData(LocalDate value){this.data=value;}
 public String getCategoria(){return categoria;} public void setCategoria(String value){this.categoria=value;}
 public enum Tipo { ENTRADA, SAIDA }
}
