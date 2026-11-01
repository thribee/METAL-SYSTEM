package com.metalsystem.backend.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
@Entity @Table(name="pagamentos_financeiros")
public class PagamentoFinanceiro {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id;
 @ManyToOne(fetch=FetchType.EAGER,optional=false) @JoinColumn(name="conta_id",nullable=false) public ContaFinanceira conta;
 @Column(nullable=false,precision=15,scale=2) public BigDecimal valor;
 @Column(nullable=false) public LocalDate data;
 @Enumerated(EnumType.STRING) @Column(nullable=false) public Forma forma;
 public String observacao;
 public enum Forma { PIX,DINHEIRO,CARTAO_CREDITO,CARTAO_DEBITO,TRANSFERENCIA,BOLETO,OUTRO }
}
