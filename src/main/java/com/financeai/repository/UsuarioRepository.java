package com.financeai.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.financeai.entity.Usuario;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

   Usuario findByCorreo(String correo);

    Optional<Usuario> findByDocumento(String documento);

    boolean existsByCorreo(String correo);

    boolean existsByDocumento(String documento);

}