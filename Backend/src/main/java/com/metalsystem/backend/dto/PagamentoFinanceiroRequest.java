package com.metalsystem.backend.dto;
import com.metalsystem.backend.entity.PagamentoFinanceiro;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
public record PagamentoFinanceiroRequest(@NotNull @DecimalMin("0.01") BigDecimal valor,
 @NotNull LocalDate data,@NotNull PagamentoFinanceiro.Forma forma,String observacao) {}
