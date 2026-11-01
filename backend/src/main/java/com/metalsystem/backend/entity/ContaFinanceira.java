package com.metalsystem.backend.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
@Entity @Table(name="contas_financeiras", uniqueConstraints=@UniqueConstraint(name="uk_conta_orcamento",columnNames="orcamento_id"))
public class ContaFinanceira {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @Enumerated(EnumType.STRING) @Column(nullable=false) public Tipo tipo;
 @Column(nullable=false,length=240) public String descricao;
 @Column(nullable=false,precision=15,scale=2) public BigDecimal valor;
 @Column(nullable=false) public LocalDate vencimento;
 public String categoria;
 public Integer clienteId;
 @Column(name="orcamento_id") public Long orcamentoId;
 @Column(nullable=false) public boolean cancelada=false;
 public enum Tipo { RECEBER,PAGAR }
}
