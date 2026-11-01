package com.metalsystem.backend.controller;
import com.metalsystem.backend.repository.UsuarioRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
@RestController @RequestMapping("/api/auth") public class AuthController {
 private final UsuarioRepository repo;public AuthController(UsuarioRepository r){repo=r;}
 @GetMapping("/me") public Map<String,Object> me(Authentication a){var u=repo.findByLoginIgnoreCase(a.getName()).orElseThrow();return Map.of("login",u.getLogin(),"nome",u.getNome(),"perfil",u.getPerfil().name());}
}
