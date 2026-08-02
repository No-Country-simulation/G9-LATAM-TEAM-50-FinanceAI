package com.financeai.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "usuario_id")
    private Integer usuarioId;

    @Column(name = "nombre_completo", nullable = false, length = 255)
    private String nombreCompleto;

    @Column(name = "documento", nullable = false, unique = true, length = 50)
    private String documento;

    @Column(name = "edad", nullable = false)
    private Integer edad;

    @Column(name = "correo", nullable = false, unique = true, length = 255)
    private String correo;

    @Column(name = "contrasena", nullable = false, length = 255)
    private String contrasena;

    @Enumerated(EnumType.STRING)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="rol_id")
    private Rol rol;

    @Column(name = "activo")
    private Boolean activo;

    @Column(name = "register_date")
    private LocalDateTime registerDate;

    @Column(name = "edit_date")
    private LocalDateTime editDate;

    @Column(name = "register_user_id")
    private String registerUserId;

    @Column(name = "ip_register")
    private String ipRegister;

    @Column(name = "user_edit")
    private String userEdit;

    @Column(name = "ip_edit")
    private String ipEdit;



}
