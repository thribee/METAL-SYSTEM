package com.metalsystem.backend.config;
import com.metalsystem.backend.repository.UsuarioRepository;
import org.springframework.context.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.*;
import org.springframework.beans.factory.annotation.Value;
import java.util.*;
@Configuration
public class SecurityConfig {
 @Bean PasswordEncoder passwordEncoder(){return new BCryptPasswordEncoder();}
 @Bean UserDetailsService users(UsuarioRepository repo){return login->{var u=repo.findByLoginIgnoreCase(login).orElseThrow(()->new UsernameNotFoundException("Usuário não encontrado"));return User.withUsername(u.getLogin()).password(u.getSenhaHash()).roles(u.getPerfil().name()).disabled(!u.isAtivo()).build();};}
 @Bean SecurityFilterChain security(HttpSecurity http) throws Exception {return http.csrf(c->c.disable()).cors(c->{}).sessionManagement(s->s.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).authorizeHttpRequests(a->a.requestMatchers(HttpMethod.OPTIONS,"/**").permitAll().requestMatchers("/api/status").permitAll().requestMatchers("/api/usuarios/**").hasRole("ADMIN").anyRequest().authenticated()).httpBasic(b->{}).build();}
 @Bean CorsConfigurationSource corsSource(@Value("${app.cors.allowed-origins:http://localhost:5500,http://127.0.0.1:5500}") String origins){var c=new CorsConfiguration();c.setAllowedOrigins(Arrays.asList(origins.split(",")));c.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));c.setAllowedHeaders(List.of("*"));var source=new UrlBasedCorsConfigurationSource();source.registerCorsConfiguration("/**",c);return source;}
}
