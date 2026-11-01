package com.metalsystem.backend.repository;
import com.metalsystem.backend.entity.ContaFinanceira;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface ContaFinanceiraRepository extends JpaRepository<ContaFinanceira,Long> {
 Optional<ContaFinanceira> findByOrcamentoId(Long orcamentoId);
}
