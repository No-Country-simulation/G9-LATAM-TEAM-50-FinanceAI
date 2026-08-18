package com.financeai.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "transaccion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaccion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaccion_id")
    private Integer transaccionId;

    @Column(length = 255)
    private String descripcion;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal monto;

    @Column(nullable = false)
    private LocalDateTime fecha;

    @Column(name = "tipo", length = 10)
    private String tipo;

    @Column(name = "metodo_pago", nullable = false, length = 30)
    private String metodoPago;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoria_id", nullable = false)
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "register_user_id")
    private String registerUserId;

    @Column(name = "register_date")
    private LocalDateTime registerDate;

    @Column(name = "ip_register")
    private String ipRegister;

    @Column(name = "user_edit")
    private String userEdit;

    @Column(name = "edit_date")
    private LocalDateTime editDate;

    @Column(name = "ip_edit")
    private String ipEdit;
}