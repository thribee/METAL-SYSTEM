package com.metalsystem.backend.entity;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
@Entity @Table(name="documentos")
public class Documento {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private LocalDate data;
 @Column(nullable=false,length=80) private String numero;
 @Column(nullable=false,length=150) private String cliente;
 private String pedido;
 @Column(nullable=false,precision=14,scale=2) private BigDecimal valor;
 @Column(nullable=false,length=40) private String tipo;
 private String anexoNome;
 private String anexoTipo;
 public String getAnexoNome(){return anexoNome;} public void setAnexoNome(String v){anexoNome=v;}
 public String getAnexoTipo(){return anexoTipo;} public void setAnexoTipo(String v){anexoTipo=v;}
 public Long getId(){return id;}
 public LocalDate getData(){return data;} public void setData(LocalDate v){data=v;}
 public String getNumero(){return numero;} public void setNumero(String v){numero=v;}
 public String getCliente(){return cliente;} public void setCliente(String v){cliente=v;}
 public String getPedido(){return pedido;} public void setPedido(String v){pedido=v;}
 public BigDecimal getValor(){return valor;} public void setValor(BigDecimal v){valor=v;}
 public String getTipo(){return tipo;} public void setTipo(String v){tipo=v;}
}
