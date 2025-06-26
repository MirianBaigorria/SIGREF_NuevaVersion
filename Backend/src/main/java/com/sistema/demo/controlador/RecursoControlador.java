package com.sistema.demo.controlador;

import com.sistema.demo.entidad.Recurso;
import com.sistema.demo.servicio.RecursoServicio;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recursos")
public class RecursoControlador {

    @Autowired
    private RecursoServicio recursoServicio;

    @GetMapping
    private ResponseEntity<?> mostrarTodos() {
        List<Recurso> recursos = recursoServicio.mostrarRecursos();
        return ResponseEntity.ok(recursos);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> mostrarUno(@PathVariable Long id){
        try{
            return ResponseEntity.ok(recursoServicio.mostrarUnRecurso(id));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/actualizarStock")
    private ResponseEntity<?> actualizarStock(@PathVariable Long id, @RequestParam("ingreso") Boolean esIngreso, @RequestParam("cant") int cantidad){
        try{
            return ResponseEntity.ok(recursoServicio.actualizarStockRecurso(id, esIngreso, cantidad));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/estaEnMinimo")
    private ResponseEntity<?> estaEnMinimo(@PathVariable Long id){
        try{
            return ResponseEntity.ok(recursoServicio.esStockMinimo(id));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    @PatchMapping("/{id}/darDeBaja")
    private ResponseEntity<?> darDeBaja(@PathVariable Long id){
        try{
            return ResponseEntity.ok(recursoServicio.darDeBajaRecurso(id));
        } catch (EntityNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

}
