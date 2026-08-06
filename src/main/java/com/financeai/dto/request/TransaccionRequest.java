package com.financeai.dto.request;

import jakarta.validation.constraints.*;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransaccionRequest {

    @NotBlank(message = "La descripción es obligatoria.")
    private String descripcion;

    @NotNull(message = "El monto es obligatorio.")
    @DecimalMin(value = "0.01", message = "El monto debe ser mayor a cero.")
    private BigDecimal monto;

    @NotBlank(message = "El método de pago es obligatorio.")
    private String metodoPago;

    @NotNull(message = "La categoría es obligatoria.")
    private Integer categoriaId;

    @NotNull(message = "El usuario es obligatorio.")
    private Integer usuarioId;

}