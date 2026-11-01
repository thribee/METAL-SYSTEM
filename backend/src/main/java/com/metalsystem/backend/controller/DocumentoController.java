package com.metalsystem.backend.controller;
import com.metalsystem.backend.entity.Documento;
import com.metalsystem.backend.dto.DocumentoRequest;
import com.metalsystem.backend.repository.DocumentoRepository;
import jakarta.validation.Valid;
import java.net.URI;
import java.nio.file.*;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.*;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import static org.springframework.http.HttpStatus.NOT_FOUND;
@RestController @RequestMapping("/api/documentos")
public class DocumentoController {
 private final DocumentoRepository repository;
 @Value("${app.upload.dir:./data/anexos}") private String pastaAnexos;
 private Path caminho(Long id) {return Path.of(pastaAnexos).toAbsolutePath().normalize().resolve("documento-"+id+".bin");}
 private String tipoArquivo(byte[] bytes) {
  if(bytes.length>=5 && bytes[0]==37 && bytes[1]==80 && bytes[2]==68 && bytes[3]==70 && bytes[4]==45)return "application/pdf";
  if(bytes.length>=3 && (bytes[0]&255)==255 && (bytes[1]&255)==216 && (bytes[2]&255)==255)return "image/jpeg";
  if(bytes.length>=8 && (bytes[0]&255)==137 && bytes[1]==80 && bytes[2]==78 && bytes[3]==71 && bytes[4]==13 && bytes[5]==10 && bytes[6]==26 && bytes[7]==10)return "image/png";
  throw new ResponseStatusException(BAD_REQUEST,"Somente PDF, JPG ou PNG são permitidos");
 }
 @PostMapping(value="/{id}/anexo",consumes=MediaType.MULTIPART_FORM_DATA_VALUE)
 public Documento anexar(@PathVariable Long id,@RequestParam("arquivo") MultipartFile arquivo) throws IOException {
  Documento doc=buscar(id);
  if(arquivo.isEmpty()||arquivo.getSize()>5*1024*1024)throw new ResponseStatusException(BAD_REQUEST,"Arquivo vazio ou acima de 5 MB");
  byte[] bytes=arquivo.getBytes(); String tipo=tipoArquivo(bytes);
  String nome=arquivo.getOriginalFilename()==null?"anexo":arquivo.getOriginalFilename().replace('\\','/');
  nome=nome.substring(nome.lastIndexOf('/')+1).replaceAll("[\\p{Cntrl}]", "");
  if(nome.isBlank())nome="anexo";
  Path dest=caminho(id);Files.createDirectories(dest.getParent());
  Path temp=Files.createTempFile(dest.getParent(),"upload-",".tmp");
  try {Files.write(temp,bytes);Files.move(temp,dest,StandardCopyOption.REPLACE_EXISTING);} finally {Files.deleteIfExists(temp);}
  doc.setAnexoNome(nome);doc.setAnexoTipo(tipo);return repository.save(doc);
 }
 @GetMapping("/{id}/anexo")
 public ResponseEntity<byte[]> baixar(@PathVariable Long id) throws IOException {
  Documento doc=buscar(id);Path path=caminho(id);
  if(doc.getAnexoNome()==null||!Files.isRegularFile(path))throw new ResponseStatusException(NOT_FOUND,"Anexo não encontrado");
  return ResponseEntity.ok().contentType(MediaType.parseMediaType(doc.getAnexoTipo())).header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\"anexo-"+id+("application/pdf".equals(doc.getAnexoTipo())?".pdf":"image/png".equals(doc.getAnexoTipo())?".png":".jpg")+"\"").body(Files.readAllBytes(path));
 }
 @DeleteMapping("/{id}/anexo")
 public ResponseEntity<Void> removerAnexo(@PathVariable Long id) throws IOException {Documento doc=buscar(id);Files.deleteIfExists(caminho(id));doc.setAnexoNome(null);doc.setAnexoTipo(null);repository.save(doc);return ResponseEntity.noContent().build();}

 public DocumentoController(DocumentoRepository repository){this.repository=repository;}
 @GetMapping public List<Documento> listar(){return repository.findAll();}
 @GetMapping("/{id}") public Documento buscar(@PathVariable Long id){return repository.findById(id).orElseThrow(()->new ResponseStatusException(NOT_FOUND,"Documento não encontrado"));}
 @PostMapping public ResponseEntity<Documento> criar(@Valid @RequestBody DocumentoRequest r){Documento d=repository.save(preencher(new Documento(),r));return ResponseEntity.created(URI.create("/api/documentos/"+d.getId())).body(d);}
 @PutMapping("/{id}") public Documento editar(@PathVariable Long id,@Valid @RequestBody DocumentoRequest r){return repository.save(preencher(buscar(id),r));}
 @DeleteMapping("/{id}") public ResponseEntity<Void> excluir(@PathVariable Long id) throws IOException {buscar(id);Files.deleteIfExists(caminho(id));repository.deleteById(id);return ResponseEntity.noContent().build();}
 private Documento preencher(Documento d,DocumentoRequest r){d.setData(r.data());d.setNumero(r.numero());d.setCliente(r.cliente());d.setPedido(r.pedido());d.setValor(r.valor());d.setTipo(r.tipo());return d;}
}
