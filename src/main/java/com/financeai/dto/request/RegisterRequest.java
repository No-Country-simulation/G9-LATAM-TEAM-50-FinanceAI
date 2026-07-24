package com.financeai.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Necesitamos tu nombre.")
    @Size(max = 255)
    private String nombreCompleto;

    @NotBlank(message = "El documento es obligatorio.")
    @Size(max = 50)
    private String documento;

    @Min(value = 18, message = "La edad minima es de 18 años.")
    private Integer edad;

    @NotBlank(message = "El correo es obligatorio.")
    @Email(message = "El correo electrónico no es válido.")
    @Size(max = 255)
    private String correo;

    @NotBlank(message = "La contraseña es obligatoria.")
    @Size(min = 8, max = 255)
    private String contrasena;

}