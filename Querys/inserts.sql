-- Insertar registros en la tabla usuarios
INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol, status)
VALUES 
('1', 'Juan', 'Pérez', 'juan.perez@example.com', 'juanperez', 'hashed_password_1', 'Docente', 'A'),
('2', 'María', 'González', 'maria.gonzalez@example.com', 'mariagonzalez', 'hashed_password_2', 'Docente', 'A'),
('3', 'Carlos', 'López', 'carlos.lopez@example.com', 'carloslopez', 'hashed_password_3', 'Alumno', 'A'),
('4', 'Ana', 'Martínez', 'ana.martinez@example.com', 'anamartinez', 'hashed_password_4', 'Alumno', 'A'),
('5', 'Luis', 'Rodríguez', 'luis.rodriguez@example.com', 'luisrodriguez', 'hashed_password_5', 'Docente', 'A'),
('6', 'Juan', 'Pérez', 'juan.mario@example.com', 'juanperez', 'hashed_password_1', 'Docente', 'A'),
('7', 'María', 'González', 'maria.peres@example.com', 'mariagonzalez', 'hashed_password_2', 'Docente', 'A');

-- Insertar registros en la tabla docentes
INSERT INTO docentes (id_usuario, especialidad) VALUES
('1', 'Guitarra'),
('2', 'Violín');

-- Insertar registros en la tabla programas
INSERT INTO programas (nombre, descripcion) VALUES
('Programa de Piano', 'Programa completo de estudios de piano'),
('Programa de Violín', 'Programa completo de estudios de violín');

-- Insertar registros en la tabla cursos
INSERT INTO cursos (id, nombre, descripcion, horario, programa_id, docente_id) VALUES
(1, 'Piano Básico', 'Curso de piano para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 1, '1'),
(2, 'Piano Avanzado', 'Curso de piano avanzado', 'Lunes a Viernes, 10:00 - 12:00', 1, '1'),
(3, 'Violín Básico', 'Curso de violín para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 2, '2'),
(4, 'Violín Avanzado', 'Curso de violín avanzado', 'Lunes a Viernes, 10:00 - 12:00', 2, '2');

-- Insertar registros en la tabla docentes_cursos
INSERT INTO docentes_cursos (docente_id, curso_id) VALUES
('1', 1),
('1', 2),
('2', 3),
('2', 4);

-- Insertar registros en la tabla alumnos
INSERT INTO alumnos (id_usuario, lugar_nacimiento, fecha_nacimiento, direccion, identidad, telefono, institucion_procedencia, instrumento, programa_id)
VALUES
('3', 'Ciudad A', '2000-01-01', 'Calle Falsa 123', '1234567890', '555-1234', 'Instituto A', 'Piano', 1),
('4', 'Ciudad B', '2001-02-02', 'Avenida Siempre Viva 742', '0987654321', '555-5678', 'Instituto B', 'Violín', 2);


-- Insertar registros en la tabla alumnos_cursos
INSERT INTO alumnos_cursos (alumno_id, curso_id, nota) VALUES
('3', 1, 85.50),
('3', 2, 90.00),
('4', 3, 88.75),
('4', 4, 92.00);
