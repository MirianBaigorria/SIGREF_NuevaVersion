-- Crear tablas

CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    nombre_usuario VARCHAR(255) UNIQUE NOT NULL,
    contrasenia VARCHAR(255) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE insumo (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    cantidad INT NOT NULL,
    minimo INT NOT NULL,
    ubicacion VARCHAR(255),
    estado BOOLEAN,
    categoria VARCHAR(50)
);

CREATE TABLE movimiento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    nombre_solicitante VARCHAR(255),
    destino VARCHAR(255),
    cantidad INT,
    tipo VARCHAR(50),
    usuario_id BIGINT,
    insumo_id BIGINT,
    CONSTRAINT fk_sol_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    CONSTRAINT fk_sol_insumo FOREIGN KEY (insumo_id) REFERENCES insumo(id)
);

