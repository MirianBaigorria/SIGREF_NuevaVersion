package com.sistema.demo.servicio;

import com.sistema.demo.entidad.Recurso;
import com.sistema.demo.repositorio.RecursoRepositorio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecursoServicio {

    @Autowired
    private RecursoRepositorio recursoRepositorio;

    //Construir un metodo que devuelve solo los que estan en estado = true
    public List<Recurso> mostrarRecursos() {
        return recursoRepositorio.findAll();
    }

    public Recurso mostrarUnRecurso(Long id) {
        return recursoRepositorio.findById(id).orElseThrow(() -> new EntityNotFoundException("Recurso no encontrado"));
    }

    public Recurso actualizarStockRecurso(Long id, Boolean esIngreso, int cantidad) {
        Recurso recurso = this.mostrarUnRecurso(id);
        int cantidadActualizada;
        if (esIngreso) {
            cantidadActualizada = recurso.getCantidad() + cantidad;
        } else {
            cantidadActualizada = recurso.getCantidad() - cantidad;
        }

        recurso.setCantidad(cantidadActualizada);

        return recursoRepositorio.saveAndFlush(recurso);
    }

    public Boolean esStockMinimo(Long id){
        Recurso recurso = this.mostrarUnRecurso(id);
        return recurso.getCantidad() <= recurso.getMinimo();
    }

    public String darDeBajaRecurso(Long id){
        Recurso recurso = this.mostrarUnRecurso(id);
        if (recurso.getEstado()){
            recurso.setEstado(false);
            recursoRepositorio.saveAndFlush(recurso);
            return "El recurso fue dado de baja con éxito.";
        }

        return "El recurso ya fue dado de baja anteriormente.";
    }

}
