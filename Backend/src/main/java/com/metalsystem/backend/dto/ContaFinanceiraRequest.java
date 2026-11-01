package com.metalsystem.backend.dto;
import com.metalsystem.backend.entity.ContaFinanceira;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
public record ContaFinanceiraRequest(@NotNull ContaFinanceira.Tipo tipo,@NotBlank String descricao,
 @NotNull @DecimalMin("0.01") BigDecimal valor,@NotNull LocalDate vencimento,
 String categoria,Integer clienteId) {}
