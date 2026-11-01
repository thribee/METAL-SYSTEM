package com.metalsystem.backend.repository;
import com.metalsystem.backend.entity.ItemOrcamento;import org.springframework.data.jpa.repository.JpaRepository;import java.util.List;
public interface ItemOrcamentoRepository extends JpaRepository<ItemOrcamento,Long>{List<ItemOrcamento> findByOrcamentoId(Long id);}
