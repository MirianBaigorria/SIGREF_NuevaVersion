package com.sistema.demo.repositorio;

import com.sistema.demo.entidad.insumo;
import com.sistema.demo.entidad.enums.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface InsumoRepositorio extends JpaRepository<insumo, Long> {
    List<insumo> findByNombreContainingIgnoreCase(String nombre);
    List<insumo> findByCodigoContainingIgnoreCase(String codigo);
    List<insumo> findByCategoria(Categoria categoria);
    List<insumo> findByEstado(Boolean estado);
}
