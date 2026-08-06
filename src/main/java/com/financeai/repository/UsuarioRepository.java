package com.financeai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financeai.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    /**
     * Buscar usuario por ID
     */
    Optional<Usuario> findByUsuarioId(Integer usuarioId);

    /**
     * Buscar usuario por correo
     */
    Optional<Usuario> findByCorreo(String correo);

    /**
     * Verificar si existe un correo
     */
    boolean existsByCorreo(String correo);

    /**
     * Verificar si existe un documento
     */
    boolean existsByDocumento(String documento);

    /**
     * Buscar por documento
     */
    Optional<Usuario> findByDocumento(String documento);

}