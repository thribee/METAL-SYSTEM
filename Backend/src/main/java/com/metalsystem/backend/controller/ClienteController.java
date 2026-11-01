package com.metalsystem.backend.controller;
import java.net.URI;
import java.util.List;
import com.metalsystem.backend.dto.ClienteRequest;
import com.metalsystem.backend.entity.Cliente;
import com.metalsystem.backend.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/clientes")
public class ClienteController {
 private final ClienteService service;
 public ClienteController(ClienteService service){this.service=service;}
 @GetMapping public List<Cliente> listar(){return service.listar();}
 @GetMapping("/{id}") public Cliente buscar(@PathVariable Integer id){return service.buscar(id);}
 @PostMapping public ResponseEntity<Cliente> criar(@Valid @RequestBody ClienteRequest request){Cliente c=service.criar(request);return ResponseEntity.created(URI.create("/api/clientes/"+c.getId())).body(c);}
 @PutMapping("/{id}") public Cliente atualizar(@PathVariable Integer id,@Valid @RequestBody ClienteRequest request){return service.atualizar(id,request);}
 @DeleteMapping("/{id}") public ResponseEntity<Void> excluir(@PathVariable Integer id){service.excluir(id);return ResponseEntity.noContent().build();}
}
