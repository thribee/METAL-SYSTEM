package com.metalsystem.backend.service;
import com.metalsystem.backend.dto.*;
import com.metalsystem.backend.entity.*;
import com.metalsystem.backend.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;
@Service
public class FinanceiroService {
 private final ContaFinanceiraRepository contas;
 private final PagamentoFinanceiroRepository pagamentos;
 private final OrcamentoRepository orcamentos;
 public FinanceiroService(ContaFinanceiraRepository c,PagamentoFinanceiroRepository p,OrcamentoRepository o){contas=c;pagamentos=p;orcamentos=o;}
 private ResponseStatusException erro(String msg){return new ResponseStatusException(HttpStatus.BAD_REQUEST,msg);}
 private ContaFinanceira obter(Long id){return contas.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Conta não encontrada"));}
 public List<ContaFinanceira> listar(){return contas.findAll();}
 public ContaFinanceira buscar(Long id){return obter(id);}
 @Transactional public ContaFinanceira criar(ContaFinanceiraRequest r){
  ContaFinanceira c=new ContaFinanceira();c.tipo=r.tipo();c.descricao=r.descricao().trim();c.valor=r.valor();c.vencimento=r.vencimento();c.categoria=r.categoria();c.clienteId=r.clienteId();return contas.save(c);
 }
 @Transactional public ContaFinanceira atualizar(Long id,ContaFinanceiraRequest r){
  ContaFinanceira c=obter(id);if(c.cancelada)throw erro("Conta cancelada");
  if(c.orcamentoId!=null)throw erro("Conta vinculada a orçamento não pode ser alterada diretamente");
  if(!pagamentos.findByContaId(id).isEmpty())throw erro("Conta com pagamentos não pode ter valor ou tipo alterado; cancele pagamentos antes");
  c.tipo=r.tipo();c.descricao=r.descricao().trim();c.valor=r.valor();c.vencimento=r.vencimento();c.categoria=r.categoria();c.clienteId=r.clienteId();return contas.save(c);
 }
 @Transactional public ContaFinanceira cancelar(Long id){ContaFinanceira c=obter(id);if(!pagamentos.findByContaId(id).isEmpty())throw erro("Não é possível cancelar conta com pagamentos");c.cancelada=true;return contas.save(c);}
 @Transactional public ContaFinanceira gerarDoOrcamento(Long id,LocalDate vencimento){
  Orcamento o=orcamentos.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Orçamento não encontrado"));
  if(o.getStatus()!=Orcamento.Status.APROVADO)throw erro("Apenas orçamento aprovado pode gerar conta");
  if(o.getValor()==null||o.getValor().signum()<=0)throw erro("Orçamento sem valor válido");
  if(vencimento==null)throw erro("Vencimento obrigatório");
  if(contas.findByOrcamentoId(id).isPresent())throw new ResponseStatusException(HttpStatus.CONFLICT,"Orçamento já possui conta a receber");
  ContaFinanceira c=new ContaFinanceira();c.tipo=ContaFinanceira.Tipo.RECEBER;c.descricao="Orçamento #"+id+" - "+o.getDescricao();c.valor=o.getValor();c.vencimento=vencimento;c.categoria="ORCAMENTO";c.clienteId=o.getClienteId();c.orcamentoId=id;return contas.save(c);
 }
 public BigDecimal pago(Long id){return pagamentos.findByContaId(id).stream().map(p->p.valor).reduce(BigDecimal.ZERO,BigDecimal::add);}
 public Map<String,Object> detalhe(Long id){ContaFinanceira c=obter(id);BigDecimal pago=pago(id),saldo=c.valor.subtract(pago);String status=c.cancelada?"CANCELADA":saldo.signum()==0?"PAGA":c.vencimento.isBefore(LocalDate.now())?"ATRASADA":pago.signum()>0?"PARCIAL":"PENDENTE";return Map.of("conta",c,"totalPago",pago,"saldo",saldo,"status",status,"pagamentos",pagamentos.findByContaId(id));}
 @Transactional public PagamentoFinanceiro pagar(Long id,PagamentoFinanceiroRequest r){
  ContaFinanceira c=obter(id);if(c.cancelada)throw erro("Conta cancelada");
  if(r.valor().compareTo(c.valor.subtract(pago(id)))>0)throw erro("Pagamento excede saldo da conta");
  PagamentoFinanceiro p=new PagamentoFinanceiro();p.conta=c;p.valor=r.valor();p.data=r.data();p.forma=r.forma();p.observacao=r.observacao();return pagamentos.save(p);
 }
 @Transactional public void estornar(Long contaId,Long pagamentoId){PagamentoFinanceiro p=pagamentos.findById(pagamentoId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Pagamento não encontrado"));if(!p.conta.id.equals(contaId))throw erro("Pagamento não pertence à conta");pagamentos.delete(p);}
 public Map<String,Object> relatorio(LocalDate inicio,LocalDate fim){
  if(inicio==null||fim==null||inicio.isAfter(fim))throw erro("Informe período válido");
  BigDecimal entradas=BigDecimal.ZERO,saidas=BigDecimal.ZERO,previstoReceber=BigDecimal.ZERO,previstoPagar=BigDecimal.ZERO,pendenteReceber=BigDecimal.ZERO,pendentePagar=BigDecimal.ZERO;
  Map<String,BigDecimal> categorias=new TreeMap<>();
  for(ContaFinanceira c:contas.findAll()){if(c.cancelada)continue;
   BigDecimal saldo=c.valor.subtract(pago(c.id));
   if(!c.vencimento.isBefore(inicio)&&!c.vencimento.isAfter(fim)){if(c.tipo==ContaFinanceira.Tipo.RECEBER){previstoReceber=previstoReceber.add(c.valor);pendenteReceber=pendenteReceber.add(saldo);}else{previstoPagar=previstoPagar.add(c.valor);pendentePagar=pendentePagar.add(saldo);}}
  }
  for(PagamentoFinanceiro p:pagamentos.findAll()){if(p.data.isBefore(inicio)||p.data.isAfter(fim)||p.conta.cancelada)continue;
   if(p.conta.tipo==ContaFinanceira.Tipo.RECEBER)entradas=entradas.add(p.valor);else saidas=saidas.add(p.valor);
   String cat=(p.conta.categoria==null||p.conta.categoria.isBlank())?"SEM_CATEGORIA":p.conta.categoria;
   categorias.merge((p.conta.tipo==ContaFinanceira.Tipo.RECEBER?"RECEITA: ":"DESPESA: ")+cat,p.valor,BigDecimal::add);
  }
  return Map.of("inicio",inicio,"fim",fim,"entradasRecebidas",entradas,"saidasPagas",saidas,"saldoCaixa",entradas.subtract(saidas),"previstoReceber",previstoReceber,"previstoPagar",previstoPagar,"pendenteReceber",pendenteReceber,"pendentePagar",pendentePagar,"porCategoria",categorias);
 }
}
