package com.metalsystem.backend.dto;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
public record DocumentoRequest(@NotNull LocalDate data, @NotBlank String numero,
 @NotBlank String cliente, String pedido, @NotNull @DecimalMin("0.00") BigDecimal valor,
 @NotBlank String tipo) {}
