package com.sistema.demo.controlador;

import com.sistema.demo.entidad.insumo;
import com.sistema.demo.entidad.enums.Categoria;
import com.sistema.demo.servicio.InsumoServicio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recursos")
public class InsumoControlador {

    @Autowired
    private InsumoServicio insumoServicio;

    @GetMapping
    private ResponseEntity<?> mostrarTodos() {
        List<insumo> insumo = insumoServicio.mostrarRecursos();
        return ResponseEntity.ok(insumo);
    }

    @GetMapping("/activos")
    private ResponseEntity<?> mostrarActivos(){
        List<insumo> insumos = insumoServicio.mostrarRecursosActivos();
        return ResponseEntity.ok(insumos);
    }

    @GetMapping("/contar/todosLosRecursos")
    private ResponseEntity<?> contarTodos(){
        return ResponseEntity.ok(insumoServicio.contarRecursos());
    }


    @GetMapping("/contar/alertaStock")
    private ResponseEntity<?> contarAlertas(){
        return ResponseEntity.ok(insumoServicio.contarAlertas());
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> mostrarUno(@PathVariable Long id){
        try{
            return ResponseEntity.ok(insumoServicio.mostrarUnRecurso(id));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/actualizarStock")
    private ResponseEntity<?> actualizarStock(@PathVariable Long id, @RequestParam("ingreso") Boolean esIngreso, @RequestParam("cant") int cantidad){
        try{
            return ResponseEntity.ok(insumoServicio.actualizarStockRecurso(id, esIngreso, cantidad));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/estaEnMinimo")
    private ResponseEntity<?> estaEnMinimo(@PathVariable Long id){
        try{
            return ResponseEntity.ok(insumoServicio.esStockMinimo(id));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/darDeBaja")
    private ResponseEntity<?> darDeBaja(@PathVariable Long id){
        try{
            return ResponseEntity.ok(insumoServicio.darDeBajaRecurso(id));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> crear(@RequestBody insumo insumo) {
        return ResponseEntity.status(HttpStatus.CREATED).body(insumoServicio.crearRecurso(insumo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(@PathVariable Long id, @RequestBody insumo insumo) {
        try {
            return ResponseEntity.ok(insumoServicio.actualizarRecurso(id, insumo));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/buscarPorNombre")
    public ResponseEntity<List<insumo>> buscarPorNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(insumoServicio.buscarPorNombre(nombre));
    }

    @GetMapping("/buscarPorCodigo")
    public ResponseEntity<List<insumo>> buscarPorCodigo(@RequestParam String codigo) {
        return ResponseEntity.ok(insumoServicio.buscarPorCodigo(codigo));
    }

    @GetMapping("/buscarPorCategoria")
    public ResponseEntity<List<insumo>> buscarPorCategoria(@RequestParam Categoria categoria) {
        return ResponseEntity.ok(insumoServicio.buscarPorCategoria(categoria));
    }

    @GetMapping("/listarStockMinimo")
    public ResponseEntity<?> listarStockMin(){
        return ResponseEntity.ok(insumoServicio.listarStockMinimo());
    }

}
