package com.financeai.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank(message = "Necesitamos tu nombre completo.")
    @Size(min = 5, max = 255)
    private String nombreCompleto;

    @NotBlank(message = "El documento es obligatorio.")
    @Pattern(
            regexp = "^[0-9]{6,20}$",
            message = "Documento inválido."
    )
    private String documento;

    @NotNull(message = "Necesitamos tu edad.")
    @Min(value = 18)
    @Max(value = 120)
    private Integer edad;

    @NotBlank(message = "El correo es obligatorio.")
    @Email(message = "Correo inválido.")
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria.")
    @Size(min = 8, max = 100)
    private String contrasena;

}