package com.financeai.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.financeai.entity.Transaccion;

@Repository
public interface TransaccionRepository extends JpaRepository<Transaccion, Integer> {

    List<Transaccion> findByUsuarioUsuarioId(Integer usuarioId);

    List<Transaccion> findByCategoriaCategoriaId(Integer categoriaId);

    List<Transaccion> findByFechaBetween(LocalDateTime inicio,
                                         LocalDateTime fin);

}