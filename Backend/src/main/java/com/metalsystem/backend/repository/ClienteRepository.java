package com.metalsystem.backend.repository;
import com.metalsystem.backend.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
public interface ClienteRepository extends JpaRepository<Cliente,Integer> {}
