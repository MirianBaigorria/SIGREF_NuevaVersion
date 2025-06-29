package com.sistema.demo.repositorio;

import com.sistema.demo.entidad.Reporte;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReporteRepositorio extends JpaRepository<Reporte, Long> {
}
