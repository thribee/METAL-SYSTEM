package com.metalsystem.backend.config;
import com.metalsystem.backend.entity.Usuario;
import com.metalsystem.backend.repository.UsuarioRepository;
import org.springframework.boot.*;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
@Configuration
public class DemoAdminInitializer {
 @Bean CommandLineRunner adminDemo(UsuarioRepository repo,PasswordEncoder encoder,Environment env){return args->{if(!java.util.Arrays.asList(env.getActiveProfiles()).contains("demo"))return;if(repo.count()>0)return;String senha=env.getProperty("APP_DEMO_ADMIN_PASSWORD");if(senha==null||senha.length()<8)throw new IllegalStateException("Configure APP_DEMO_ADMIN_PASSWORD (minimo 8 caracteres) para iniciar demo");var u=new Usuario();u.setLogin("admin");u.setNome("Administrador Demo");u.setPerfil(Usuario.Perfil.ADMIN);u.setAtivo(true);u.setSenhaHash(encoder.encode(senha));repo.save(u);};}
}
