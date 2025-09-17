package com.sistema.demo.servicio;

import com.sistema.demo.entidad.insumo;
import com.sistema.demo.entidad.enums.Categoria;
import com.sistema.demo.repositorio.InsumoRepositorio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InsumoServicio {

    @Autowired
    private InsumoRepositorio insumoRepositorio;

    //Construir un metodo que devuelve solo los que estan en estado = true
    public List<insumo> mostrarRecursos() {
        return insumoRepositorio.findAll();
    }

    public List<insumo> mostrarRecursosActivos() {
        return insumoRepositorio.findByEstado(true);
    }

    public Long contarRecursos(){
        return insumoRepositorio.count();
    }

    public int contarAlertas() {
        List<insumo> insumos = this.mostrarRecursos().stream().toList();
        int cant = 0;
        for (insumo insumo : insumos){
            if (this.esStockMinimo(insumo.getId())){
                cant++;
            }
        }
        return cant;
    }

    public insumo mostrarUnRecurso(Long id) {
        return insumoRepositorio.findById(id).orElseThrow(() -> new EntityNotFoundException("Recurso no encontrado"));
    }

    public insumo actualizarStockRecurso(Long id, Boolean esIngreso, int cantidad) {
        insumo insumo = this.mostrarUnRecurso(id);
        int cantidadActualizada;
        if (esIngreso) {
            cantidadActualizada = insumo.getCantidad() + cantidad;
        } else {
            cantidadActualizada = insumo.getCantidad() - cantidad;
        }

        insumo.setCantidad(cantidadActualizada);

        return insumoRepositorio.saveAndFlush(insumo);
    }

    public Boolean esStockMinimo(Long id){
        insumo insumo = this.mostrarUnRecurso(id);
        return insumo.getCantidad() <= insumo.getMinimo();
    }

    public String darDeBajaRecurso(Long id){
        insumo insumo = this.mostrarUnRecurso(id);
        if (insumo.getEstado()){
            insumo.setEstado(false);
            insumoRepositorio.saveAndFlush(insumo);
            return "El recurso fue dado de baja con éxito.";
        }

        return "El recurso ya fue dado de baja anteriormente.";
    }

    public insumo crearRecurso(insumo insumo) {
        insumo.setEstado(true);
        return insumoRepositorio.save(insumo);
    }

    public insumo actualizarRecurso(Long id, insumo insumoActualizado) {
        insumo insumoExistente = this.mostrarUnRecurso(id);

        insumoExistente.setNombre(insumoActualizado.getNombre());
        insumoExistente.setDescripcion(insumoActualizado.getDescripcion());
        insumoExistente.setCodigo(insumoActualizado.getCodigo());
        insumoExistente.setCantidad(insumoActualizado.getCantidad());
        insumoExistente.setMinimo(insumoActualizado.getMinimo());
        insumoExistente.setUbicacion(insumoActualizado.getUbicacion());
        insumoExistente.setCategoria(insumoActualizado.getCategoria());
        insumoExistente.setEstado(insumoActualizado.getEstado());

        return insumoRepositorio.saveAndFlush(insumoExistente);
    }

    public List<insumo> buscarPorNombre(String nombre) {
        return insumoRepositorio.findByNombreContainingIgnoreCase(nombre);
    }

    public List<insumo> buscarPorCodigo(String codigo) {
        return insumoRepositorio.findByCodigoContainingIgnoreCase(codigo);
    }

    public List<insumo> buscarPorCategoria(Categoria categoria) {
        return insumoRepositorio.findByCategoria(categoria);
    }

    public List<insumo> listarStockMinimo(){
        List<insumo> stockMinimo = insumoRepositorio.findAll().stream()
                .filter(r -> r.getCantidad() <= r.getMinimo())
                .toList();
        return stockMinimo;
    }
}
