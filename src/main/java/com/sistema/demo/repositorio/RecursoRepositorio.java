package com.sistema.demo.repositorio;

import com.sistema.demo.entidad.Recurso;
import com.sistema.demo.entidad.enums.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface RecursoRepositorio extends JpaRepository<Recurso, Long> {
    List<Recurso> findByNombreContainingIgnoreCase(String nombre);
    List<Recurso> findByCodigoContainingIgnoreCase(String codigo);
    List<Recurso> findByCategoria(Categoria categoria);
    List<Recurso> findByEstado(Boolean estado);
}
