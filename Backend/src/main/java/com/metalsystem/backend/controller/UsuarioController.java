package com.metalsystem.backend.controller;
import com.metalsystem.backend.entity.Usuario;
import com.metalsystem.backend.repository.UsuarioRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.*;
@RestController @RequestMapping("/api/usuarios")
public class UsuarioController {
 private final UsuarioRepository repo;private final PasswordEncoder encoder;
 public UsuarioController(UsuarioRepository r,PasswordEncoder e){repo=r;encoder=e;}
 public record Dados(@NotBlank String login,@NotBlank String nome,String senha,@NotNull Usuario.Perfil perfil,boolean ativo){}
 public record Saida(Long id,String login,String nome,Usuario.Perfil perfil,boolean ativo){}
 private Saida saida(Usuario u){return new Saida(u.getId(),u.getLogin(),u.getNome(),u.getPerfil(),u.isAtivo());}
 @GetMapping public List<Saida> listar(){return repo.findAll().stream().map(this::saida).toList();}
 @PostMapping public Saida criar(@Valid @RequestBody Dados d){if(d.senha()==null||d.senha().length()<8)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Senha deve ter pelo menos 8 caracteres");if(repo.findByLoginIgnoreCase(d.login()).isPresent())throw new ResponseStatusException(HttpStatus.CONFLICT,"Login existente");var u=new Usuario();copiar(u,d);u.setSenhaHash(encoder.encode(d.senha()));return saida(repo.save(u));}
 @PutMapping("/{id}") public Saida editar(@PathVariable Long id,@Valid @RequestBody Dados d){var u=repo.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));var outro=repo.findByLoginIgnoreCase(d.login());if(outro.isPresent()&&!outro.get().getId().equals(id))throw new ResponseStatusException(HttpStatus.CONFLICT,"Login existente");copiar(u,d);if(d.senha()!=null&&!d.senha().isBlank()){if(d.senha().length()<8)throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Senha curta");u.setSenhaHash(encoder.encode(d.senha()));}return saida(repo.save(u));}
 private void copiar(Usuario u,Dados d){u.setLogin(d.login());u.setNome(d.nome());u.setPerfil(d.perfil());u.setAtivo(d.ativo());}
}
