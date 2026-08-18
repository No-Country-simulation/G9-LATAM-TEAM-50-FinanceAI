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

    @Column(name = "nombre_completo", nullable = false)
    private String nombreCompleto;

    @Column(name = "documento", nullable = false, unique = true)
    private String documento;

    @Column(name = "edad")
    private Integer edad;

    @Column(name = "correo", nullable = false, unique = true)
    private String correo;

    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @ManyToOne
    @JoinColumn(name = "rol_id", nullable = false)
    private Rol rol;

    @Column(name = "activo")
    private Boolean activo;

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