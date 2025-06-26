package com.sistema.demo.repositorio;

import com.sistema.demo.entidad.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecursoRepositorio extends JpaRepository<Recurso, Long> {
}
