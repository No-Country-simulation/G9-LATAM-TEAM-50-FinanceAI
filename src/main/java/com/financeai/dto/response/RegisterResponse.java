package com.financeai.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class RegisterResponse {

    private Integer usuarioId;

    private String nombreCompleto;

    private String correo;

    private String mensaje;

}