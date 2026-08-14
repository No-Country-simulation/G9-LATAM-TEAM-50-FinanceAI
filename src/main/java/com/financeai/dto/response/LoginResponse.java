package com.financeai.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String token;

    private String tipo;

    private Integer usuarioId;

    private String nombreCompleto;

    private String correo;

    private String rol;
}