package com.metalsystem.backend.entity;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity @Table(name="orcamentos")
public class Orcamento {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
  private String descricao;
  private BigDecimal valor;
  private LocalDate data;
  @Enumerated(EnumType.STRING) private Status status;
  private Integer clienteId;
 public Long getId(){return id;}
 public String getDescricao(){return descricao;} public void setDescricao(String value){this.descricao=value;}
 public BigDecimal getValor(){return valor;} public void setValor(BigDecimal value){this.valor=value;}
 public LocalDate getData(){return data;} public void setData(LocalDate value){this.data=value;}
 public Status getStatus(){return status;} public void setStatus(Status value){this.status=value;}
 public Integer getClienteId(){return clienteId;} public void setClienteId(Integer value){this.clienteId=value;}
 public enum Status { AGUARDANDO, APROVADO, RECUSADO }
}
