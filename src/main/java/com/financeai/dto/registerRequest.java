package com.financeai.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class registerRequest {


    @NotBlank(message = "Necesitamos tu nombre")
    private String nombre;


    @NotBlank(message = "Necesitamos tu apellido")
    private String apellido;


    @NotBlank(message = "El email es necesario")
    @Email(message = "El formato del email no es valido")
    private String email;


    @NotBlank(message = "Necesitas una contrasenia")
    @Size(min = 8, message = "El password debe tener almenos 8 caracteres")
    private String password;


}