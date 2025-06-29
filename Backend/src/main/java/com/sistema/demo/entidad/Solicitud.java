package com.sistema.demo.entidad;

import com.sistema.demo.entidad.enums.Tipo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Solicitud {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String codigoSolicitud;
    private Date fecha;
    private String nombreSolicitante;
    private String destino;
    private int cantidad;

    @Enumerated(EnumType.STRING)
    private Tipo tipo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario generadoPor;

    @ManyToOne
    @JoinColumn(name = "recurso_id")
    private Recurso recurso;
}
