package com.metalsystem.backend.entity;
import jakarta.persistence.*;
@Entity @Table(name="usuarios")
public class Usuario {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,unique=true,length=80) private String login;
 @Column(nullable=false) private String senhaHash;
 @Column(nullable=false) private String nome;
 @Enumerated(EnumType.STRING) @Column(nullable=false) private Perfil perfil=Perfil.FUNCIONARIO;
 private boolean ativo=true;
 public enum Perfil { ADMIN, FUNCIONARIO }
 public Long getId(){return id;} public String getLogin(){return login;} public void setLogin(String v){login=v;}
 public String getSenhaHash(){return senhaHash;} public void setSenhaHash(String v){senhaHash=v;}
 public String getNome(){return nome;} public void setNome(String v){nome=v;}
 public Perfil getPerfil(){return perfil;} public void setPerfil(Perfil v){perfil=v;}
 public boolean isAtivo(){return ativo;} public void setAtivo(boolean v){ativo=v;}
}
