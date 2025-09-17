package com.sistema.demo.servicio;

import com.sistema.demo.entidad.insumo;
import com.sistema.demo.entidad.Solicitud;
import com.sistema.demo.entidad.Usuario;
import com.sistema.demo.entidad.enums.Tipo;
import com.sistema.demo.repositorio.InsumoRepositorio;
import com.sistema.demo.repositorio.SolicitudRepositorio;
import com.sistema.demo.repositorio.UsuarioRepositorio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class SolicitudServicio {

    @Autowired
    private SolicitudRepositorio solicitudRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    private InsumoRepositorio insumoRepositorio;


    public List<Solicitud> listarSolicitudes() {
        return solicitudRepositorio.findAll();
    }

    public Solicitud obtenerPorId(Long id) {
        return solicitudRepositorio.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Solicitud no encontrada con id: " + id));
    }

    public Solicitud crear(Solicitud solicitud) {
        return solicitudRepositorio.save(solicitud);
    }

    public Solicitud actualizar(Long id, Solicitud solicitudActualizada) {
        Solicitud solicitudExistente = obtenerPorId(id);

        solicitudExistente.setCodigoSolicitud(solicitudActualizada.getCodigoSolicitud());
        solicitudExistente.setFecha(solicitudActualizada.getFecha());
        solicitudExistente.setNombreSolicitante(solicitudActualizada.getNombreSolicitante());
        solicitudExistente.setDestino(solicitudActualizada.getDestino());
        solicitudExistente.setCantidad(solicitudActualizada.getCantidad());
        solicitudExistente.setTipo(solicitudActualizada.getTipo());
        solicitudExistente.setGeneradoPor(solicitudActualizada.getGeneradoPor());
        solicitudExistente.setInsumo(solicitudActualizada.getInsumo());

        return solicitudRepositorio.saveAndFlush(solicitudExistente);
    }

    public void eliminar(Long id) {
        solicitudRepositorio.deleteById(id);
    }

    public Solicitud registrar(Long idUsuario, Long idRecurso, Solicitud solicitud) {
        Usuario usuario = usuarioRepositorio.findById(idUsuario)
                .orElseThrow(() -> new EntityNotFoundException("Usuario no encontrado"));

        insumo insumo = insumoRepositorio.findById(idRecurso)
                .orElseThrow(() -> new EntityNotFoundException("Recurso no encontrado"));

        if (insumo.getCantidad() < solicitud.getCantidad()){
            throw new NoSuchElementException("El recurso no posee la cantidad suficiente para cumplir con la solicitud.");
        }

        insumo.setCantidad(insumo.getCantidad() - solicitud.getCantidad());
        System.out.println(insumo.getCantidad());
        insumoRepositorio.saveAndFlush(insumo);
        solicitud.setGeneradoPor(usuario);
        solicitud.setInsumo(insumo);
        solicitud.setFecha(new Date());
        solicitud.setActivo(true);
        solicitud.setCodigoSolicitud("SOL00" + (this.listarSolicitudes().size()+1));

        return solicitudRepositorio.save(solicitud);
    }

    public List<Solicitud> prestamosPendientes() {
        return solicitudRepositorio.findByTipoAndActivo(Tipo.PRESTAMO, true);
    }

    /*public String registrarDevolucion(String codigoSolicitud, Solicitud devolucion) {
        Optional<Solicitud> devolucionExistente = solicitudRepositorio.findByCodigoSolicitudAndTipo(codigoSolicitud, Tipo.DEVOLUCION);

        if (devolucionExistente.isPresent()) {
            return "Error: Ya existe una devolución registrada para la solicitud con código: " + codigoSolicitud;
        }

        Optional<Solicitud> prestamo = solicitudRepositorio.findByCodigoSolicitudAndTipo(codigoSolicitud, Tipo.PRESTAMO);

        if (prestamo.isEmpty()) {
            return "Error: No se encontró un préstamo con ese código de solicitud.";
        }

        devolucion.setCodigoSolicitud(codigoSolicitud);
        devolucion.setFecha(new Date());
        devolucion.setTipo(Tipo.DEVOLUCION);
        devolucion.setGeneradoPor(prestamo.get().getGeneradoPor());
        devolucion.setRecurso(prestamo.get().getRecurso());

        solicitudRepositorio.save(devolucion);
        return "Devolución registrada correctamente.";
    }*/
}
