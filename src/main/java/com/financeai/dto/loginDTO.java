package com.financeai.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record loginDTO(@NotBlank String contrasena, @Email String correo) {

}
