package com.metalsystem.backend.service;
import java.util.List;
import com.metalsystem.backend.dto.ClienteRequest;
import com.metalsystem.backend.entity.Cliente;
import com.metalsystem.backend.repository.ClienteRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
@Service
public class ClienteService {
 private final ClienteRepository repository;
 public ClienteService(ClienteRepository repository){this.repository=repository;}
 @Transactional(readOnly=true) public List<Cliente> listar(){return repository.findAll();}
 @Transactional(readOnly=true) public Cliente buscar(Integer id){return repository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Cliente não encontrado"));}
 @Transactional public Cliente criar(ClienteRequest request){Cliente c=new Cliente();preencher(c,request);return repository.save(c);}
 @Transactional public Cliente atualizar(Integer id,ClienteRequest request){Cliente c=buscar(id);preencher(c,request);return repository.save(c);}
 @Transactional public void excluir(Integer id){Cliente c=buscar(id);repository.delete(c);}
 private void preencher(Cliente c,ClienteRequest r){c.setNome(r.nome().trim());c.setEmail(r.email());c.setTelefone(r.telefone());c.setIdade(r.idade());c.setEndereco(r.endereco());}
}
