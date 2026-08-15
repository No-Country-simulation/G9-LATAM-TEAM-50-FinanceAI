package com.financeai.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransaccionRequest {

    private String descripcion;

    @NotNull
    private BigDecimal monto;

    @NotNull
    private String metodoPago;

    @NotNull
    private Integer categoriaId;
}