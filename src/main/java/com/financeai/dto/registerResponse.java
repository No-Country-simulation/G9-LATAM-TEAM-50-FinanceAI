package com.financeai.dto;


import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class registerResponse {


    private Long id;

    private String nombre;

    private String apellido;

    private String email;

    private String mensaje;

}