package com.metalsystem.backend.entity;
import java.time.LocalDateTime;
import jakarta.persistence.*;
@Entity @Table(name="clientes")
public class Cliente {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Integer id;
 @Column(nullable=false,length=100) private String nome;
 @Column(length=150) private String email;
 @Column(length=20) private String telefone;
 private Integer idade;
 @Column(length=255) private String endereco;
 @Column(name="criado_em",insertable=false,updatable=false) private LocalDateTime criadoEm;
 public Integer getId(){return id;}
 public String getNome(){return nome;} public void setNome(String v){nome=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getTelefone(){return telefone;} public void setTelefone(String v){telefone=v;}
 public Integer getIdade(){return idade;} public void setIdade(Integer v){idade=v;}
 public String getEndereco(){return endereco;} public void setEndereco(String v){endereco=v;}
 public LocalDateTime getCriadoEm(){return criadoEm;}
}
