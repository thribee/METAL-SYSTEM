package com.metalsystem.backend.repository;
import com.metalsystem.backend.entity.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ProdutoRepository extends JpaRepository<Produto,Long> {}
