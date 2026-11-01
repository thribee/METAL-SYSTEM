package com.metalsystem.backend.dto;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;

import com.metalsystem.backend.entity.Produto;
public record ProdutoRequest(@NotBlank @Size(max=160) String nome, @NotNull @Min(0) Integer quantidade, @NotNull @DecimalMin("0.00") BigDecimal precoUnitario, @Size(max=40) String unidade) {}
