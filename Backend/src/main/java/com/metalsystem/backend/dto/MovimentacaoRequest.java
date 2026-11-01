package com.metalsystem.backend.dto;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.metalsystem.backend.entity.Movimentacao;
public record MovimentacaoRequest(@NotNull Movimentacao.Tipo tipo, @NotBlank @Size(max=160) String descricao, @NotNull @DecimalMin("0.01") BigDecimal valor, @NotNull LocalDate data, @Size(max=80) String categoria) {}
