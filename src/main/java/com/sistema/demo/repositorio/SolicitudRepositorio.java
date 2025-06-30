package com.sistema.demo.repositorio;

import com.sistema.demo.entidad.Solicitud;
import com.sistema.demo.entidad.enums.Tipo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SolicitudRepositorio extends JpaRepository<Solicitud, Long> {
    Optional<Solicitud> findByCodigoSolicitudAndTipo(String codigo, Tipo tipo);
    List<Solicitud> findByTipoAndActivo(Tipo tipo, Boolean activo);
}
