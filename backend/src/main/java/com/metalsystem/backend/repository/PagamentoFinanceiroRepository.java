package com.metalsystem.backend.repository;
import com.metalsystem.backend.entity.PagamentoFinanceiro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
public interface PagamentoFinanceiroRepository extends JpaRepository<PagamentoFinanceiro,Long> {
 List<PagamentoFinanceiro> findByContaId(Long contaId);
}
