package com.metalsystem.backend.dto;
import jakarta.validation.constraints.*;
public record ClienteRequest(
 @NotBlank @Size(max=100) String nome,
 @Email @Size(max=150) String email,
 @Size(max=20) String telefone,
 @Min(0) @Max(130) Integer idade,
 @Size(max=255) String endereco
) {}
