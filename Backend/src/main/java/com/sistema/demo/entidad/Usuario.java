package com.sistema.demo.entidad;

import com.sistema.demo.entidad.enums.Rol;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String nombreUsuario;
    private String contrasenia;

    @Enumerated(EnumType.STRING)
    private Rol rol;

    @OneToMany(mappedBy = "generadoPor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reporte> reportes;

    @OneToMany(mappedBy = "generadoPor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Movimiento> movimientos;

    @OneToMany(mappedBy = "generadoPor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Solicitud> solicitudes;


}
