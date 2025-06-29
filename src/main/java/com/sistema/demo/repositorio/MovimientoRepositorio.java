package com.sistema.demo.repositorio;

import com.sistema.demo.entidad.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovimientoRepositorio extends JpaRepository<Movimiento, Long> {
}
