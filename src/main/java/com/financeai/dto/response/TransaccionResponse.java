package com.financeai.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransaccionResponse {

    private Integer transaccionId;

    private String descripcion;

    private BigDecimal monto;

    private LocalDateTime fecha;

    private String tipo;

    private String metodoPago;

    private String categoria;

    private String usuario;
}