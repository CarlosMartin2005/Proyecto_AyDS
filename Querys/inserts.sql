-- Insertar registros en la tabla usuarios
INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol, status)
VALUES 
('1', 'Juan', 'Pérez', 'juan.perez@example.com', 'juanperez', 'hashed_password_1', 'Docente', 'A'),
('2', 'María', 'González', 'maria.gonzalez@example.com', 'mariagonzalez', 'hashed_password_2', 'Docente', 'A'),
('3', 'Carlos', 'López', 'carlos.lopez@example.com', 'carloslopez', 'hashed_password_3', 'Alumno', 'A'),
('4', 'Ana', 'Martínez', 'ana.martinez@example.com', 'anamartinez', 'hashed_password_4', 'Alumno', 'A'),
('5', 'Luis', 'Rodríguez', 'luis.rodriguez@example.com', 'luisrodriguez', 'hashed_password_5', 'Docente', 'A');

INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol, status) VALUES
('6', 'Juan', 'Pérez', 'juan.mario@example.com', 'juanperez', 'hashed_password_1', 'Docente', 'A'),
('7', 'María', 'González', 'maria.peres@example.com', 'mariagonzalez', 'hashed_password_2', 'Docente', 'A');


INSERT INTO docentes (id_usuario, especialidad) VALUES
('1', 'Guitarra'),
('2', 'Violín');


INSERT INTO programas (nombre, descripcion) VALUES
('Programa de Piano', 'Programa completo de estudios de piano'),
('Programa de Violín', 'Programa completo de estudios de violín');


INSERT INTO cursos (id, nombre, descripcion, horario, programa_id, docente_id) VALUES
(1, 'Piano Básico', 'Curso de piano para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 1, '1'),
(2, 'Piano Avanzado', 'Curso de piano avanzado', 'Lunes a Viernes, 10:00 - 12:00', 1, '1'),
(3, 'Violín Básico', 'Curso de violín para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 2, '2'),
(4, 'Violín Avanzado', 'Curso de violín avanzado', 'Lunes a Viernes, 10:00 - 12:00', 2, '2');

INSERT INTO docentes_cursos (docente_id, curso_id) VALUES
('1', 1),
('1', 2),
('2', 3),
('2', 4);