package com.metalsystem.backend.dto;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.metalsystem.backend.entity.Orcamento;
public record OrcamentoRequest(@NotBlank @Size(max=160) String descricao, @NotNull @DecimalMin("0.00") BigDecimal valor, @NotNull LocalDate data, @NotNull Orcamento.Status status, Integer clienteId) {}
