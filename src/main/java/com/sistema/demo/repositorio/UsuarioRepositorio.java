package com.sistema.demo.repositorio;

import com.sistema.demo.entidad.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNombreUsuarioAndContrasenia(String nombreUsuario, String contrasenia);
}
