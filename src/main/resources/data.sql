-- Insertar Usuarios
INSERT INTO usuario (nombre, nombre_usuario, contrasenia, rol) VALUES
('Juan Pérez', 'jperez', '1234', 'ADMINISTRADOR'),
('Maria López', 'mlopez', 'abcd', 'OPERADOR'),
('Carlos Ruiz', 'cruiz', 'qwerty', 'OPERADOR'),
('Laura García', 'lgarcia', 'pass', 'OPERADOR'),
('Sofia Nieto Piccoli', 'sofianp', 'admin', 'ADMINISTRADOR'),
('Mirian Baigorria', 'mbaigo', 'admin', 'ADMINISTRADOR');

-- Insertar Insumos
INSERT INTO insumo (nombre, descripcion, cantidad, minimo, ubicacion, estado, categoria) VALUES
('Impresora HP', 'Impresora láser', 10, 2, 'Oficina A', true, 'INFORMATICO'),
('Silla ergonómica', 'Silla para oficina', 15, 5, 'Deposito', true, 'MOBILIARIO'),
('PC Escritorio', 'Computadora de escritorio', 5, 1, 'Sala B', true, 'INFORMATICO'),
('Proyector', 'Proyector de presentaciones', 2, 4, 'Sala de Reuniones', true, 'OFICINA'),
('Mesa Reunión', 'Mesa grande', 3, 5, 'Sala de Reuniones', true, 'MOBILIARIO');

-- Insertar Solicitudes
INSERT INTO movimiento (fecha, nombre_solicitante, destino, cantidad, tipo, usuario_id, recurso_id) VALUES
(CURRENT_DATE, 'Javier', 'Aula 1', 2, 'EGRESO', 2, 1),
(CURRENT_DATE, 'Ana', 'Oficina 3', 1, 'EGRESO', 3, 2),
(CURRENT_DATE, 'Luis', 'Deposito', 3, 'EGRESO', 4, 3),
(CURRENT_DATE, 'Sara', 'Sala B', 1, 'EGRESO', 5, 4),
(CURRENT_DATE, '', 'DEPÓSITO', 1, 'INGRESO', 5, 4),
(CURRENT_DATE, 'Marta', 'Oficina Principal', 2, 'EGRESO', 1, 5);
