-- Insertar registros en la tabla usuarios
INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol, status)
VALUES 
('1', 'Juan', 'Pérez', 'juan.perez@example.com', 'juanperez', 'hashed_password_1', 'Docente', 'A'),
('2', 'María', 'González', 'maria.gonzalez@example.com', 'mariagonzalez', 'hashed_password_2', 'Docente', 'A'),
('3', 'Carlos', 'López', 'carlos.lopez@example.com', 'carloslopez', 'hashed_password_3', 'Alumno', 'A'),
('4', 'Ana', 'Martínez', 'ana.martinez@example.com', 'anamartinez', 'hashed_password_4', 'Alumno', 'A'),
('5', 'Luis', 'Rodríguez', 'luis.rodriguez@example.com', 'luisrodriguez', 'hashed_password_5', 'Docente', 'A'),
('6', 'Juan', 'Pérez', 'juan.mario@example.com', 'juanperez', 'hashed_password_1', 'Docente', 'A'),
('7', 'María', 'González', 'maria.peres@example.com', 'mariagonzalez', 'hashed_password_2', 'Docente', 'A'),
('8', 'Pedro', 'Ramírez', 'pedro.ramirez@example.com', 'pedroramirez', 'hashed_password_6', 'Alumno', 'A'),
('9', 'Lucía', 'Fernández', 'lucia.fernandez@example.com', 'luciafernandez', 'hashed_password_7', 'Alumno', 'A'),
('10', 'Miguel', 'Hernández', 'miguel.hernandez@example.com', 'miguelhernandez', 'hashed_password_8', 'Alumno', 'A'),
('11', 'Laura', 'García', 'laura.garcia@example.com', 'lauragarcia', 'hashed_password_9', 'Alumno', 'A'),
('12', 'Sofía', 'Martínez', 'sofia.martinez@example.com', 'sofiamartinez', 'hashed_password_10', 'Alumno', 'A'),
('13', 'David', 'Gómez', 'david.gomez@example.com', 'davidgomez', 'hashed_password_11', 'Alumno', 'A'),
('14', 'Daniela', 'López', 'daniela.lopez@example.com', 'danielalopez', 'hashed_password_12', 'Alumno', 'A'),
('15', 'Jorge', 'Díaz', 'jorge.diaz@example.com', 'jorgediaz', 'hashed_password_13', 'Alumno', 'A'),
('16', 'Carla', 'Sánchez', 'carla.sanchez@example.com', 'carlasanchez', 'hashed_password_14', 'Alumno', 'A'),
('17', 'Andrés', 'Ruiz', 'andres.ruiz@example.com', 'andresruiz', 'hashed_password_15', 'Alumno', 'A'),
('18', 'Paula', 'Torres', 'paula.torres@example.com', 'paulatorres', 'hashed_password_16', 'Alumno', 'A'),
('19', 'Fernando', 'Ramírez', 'fernando.ramirez@example.com', 'fernandoramirez', 'hashed_password_17', 'Alumno', 'A'),
('20', 'Elena', 'Mendoza', 'elena.mendoza@example.com', 'elenamendoza', 'hashed_password_18', 'Alumno', 'A');

-- Insertar registros en la tabla docentes
INSERT INTO docentes (id_usuario, especialidad) VALUES
('1', 'Guitarra'),
('2', 'Violín'),
('5', 'Piano'),
('6', 'Flauta'),
('7', 'Batería');

-- Insertar registros en la tabla programas
INSERT INTO programas (nombre, descripcion) VALUES
('Pequeños artistas', 'Programa para niños pequeños'),
('Programa Juvenil', 'Programa para jóvenes'),
('Cursos libres', 'Cursos abiertos para todos');

-- Insertar registros en la tabla cursos
INSERT INTO cursos (nombre, descripcion, horario, programa_id, docente_id) VALUES
('Piano Básico', 'Curso de piano para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 1, '5'),
('Piano Avanzado', 'Curso de piano avanzado', 'Lunes a Viernes, 10:00 - 12:00', 1, '5'),
('Violín Básico', 'Curso de violín para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 2, '2'),
('Violín Avanzado', 'Curso de violín avanzado', 'Lunes a Viernes, 10:00 - 12:00', 2, '2'),
('Guitarra Básica', 'Curso de guitarra para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 3, '1'),
('Guitarra Avanzada', 'Curso de guitarra avanzado', 'Lunes a Viernes, 10:00 - 12:00', 3, '1'),
('Flauta Básica', 'Curso de flauta para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 1, '6'),
('Flauta Avanzada', 'Curso de flauta avanzado', 'Lunes a Viernes, 10:00 - 12:00', 1, '6'),
('Batería Básica', 'Curso de batería para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 2, '7'),
('Batería Avanzada', 'Curso de batería avanzado', 'Lunes a Viernes, 10:00 - 12:00', 2, '7');

-- Insertar registros en la tabla alumnos
INSERT INTO alumnos (id_usuario, lugar_nacimiento, fecha_nacimiento, direccion, identidad, telefono, institucion_procedencia, instrumento) VALUES
('3', 'Ciudad A', '2000-01-01', 'Calle Falsa 123', '1234567890', '555-1234', 'Instituto A', 'Piano'),
('4', 'Ciudad B', '2001-02-02', 'Avenida Siempre Viva 742', '0987654321', '555-5678', 'Instituto B', 'Violín'),
('8', 'Ciudad C', '2002-03-03', 'Calle Nueva 456', '1122334455', '555-7890', 'Instituto C', 'Guitarra'),
('9', 'Ciudad D', '2003-04-04', 'Avenida Central 123', '6677889900', '555-4321', 'Instituto D', 'Flauta'),
('10', 'Ciudad E', '2004-05-05', 'Calle Principal 789', '9988776655', '555-9876', 'Instituto E', 'Batería'),
('11', 'Ciudad F', '2005-06-06', 'Avenida Secundaria 321', '1122446688', '555-6543', 'Instituto F', 'Piano'),
('12', 'Ciudad G', '2006-07-07', 'Calle Tercera 654', '2233445566', '555-3210', 'Instituto G', 'Violín'),
('13', 'Ciudad H', '2007-08-08', 'Avenida Cuarta 987', '3344556677', '555-7890', 'Instituto H', 'Guitarra'),
('14', 'Ciudad I', '2008-09-09', 'Calle Quinta 123', '4455667788', '555-1234', 'Instituto I', 'Flauta'),
('15', 'Ciudad J', '2009-10-10', 'Avenida Sexta 456', '5566778899', '555-5678', 'Instituto J', 'Batería'),
('16', 'Ciudad K', '2010-11-11', 'Calle Séptima 789', '6677239900', '555-9876', 'Instituto K', 'Piano'),
('17', 'Ciudad L', '2011-12-12', 'Avenida Octava 321', '7788990011', '555-6543', 'Instituto L', 'Violín'),
('18', 'Ciudad M', '2012-01-01', 'Calle Novena 654', '8899001122', '555-3210', 'Instituto M', 'Guitarra'),
('19', 'Ciudad N', '2013-02-02', 'Avenida Décima 987', '9900112233', '555-7890', 'Instituto N', 'Flauta'),
('20', 'Ciudad O', '2014-03-03', 'Calle Once 123', '0011223344', '555-1234', 'Instituto O', 'Batería');

-- Insertar registros en la tabla alumnos_cursos
INSERT INTO alumnos_cursos (alumno_id, curso_id, nota) VALUES
('3', 1, 85.50),
('3', 2, 90.00),
('4', 3, 88.75),
('4', 4, 92.00),
('8', 5, 45.00),
('8', 6, 50.00),
('9', 7, 55.00),
('9', 8, 40.00),
('10', 9, 60.00),
('10', 10, 70.00),
('11', 1, 75.00),
('11', 2, 80.00),
('12', 3, 85.00),
('12', 4, 90.00),
('13', 5, 95.00),
('13', 6, 100.00),
('14', 7, 65.00),
('14', 8, 70.00),
('15', 9, 75.00),
('15', 10, 80.00);
-- Insertar registros en la tabla alumnos_cursos
INSERT INTO alumnos_cursos (alumno_id, curso_id, nota) VALUES
('16', 1, 85.00), -- Asignar a alumno 16 al curso de Piano Básico
('16', 2, 90.00), -- Asignar a alumno 16 al curso de Piano Avanzado
('17', 3, 88.00), -- Asignar a alumno 17 al curso de Violín Básico
('17', 4, 92.00), -- Asignar a alumno 17 al curso de Violín Avanzado
('18', 5, 87.00), -- Asignar a alumno 18 al curso de Guitarra Básica
('18', 6, 91.00), -- Asignar a alumno 18 al curso de Guitarra Avanzada
('19', 7, 86.00), -- Asignar a alumno 19 al curso de Flauta Básica
('19', 8, 89.00), -- Asignar a alumno 19 al curso de Flauta Avanzada
('20', 9, 84.00), -- Asignar a alumno 20 al curso de Batería Básica
('20', 10, 88.00); -- Asignar a alumno 20 al curso de Batería Avanzada

-- Insertar registros en la tabla alumnos_programas
INSERT INTO alumnos_programas (alumno_id, programa_id) VALUES
('3', 1),
('4', 2),
('8', 3),
('9', 1),
('10', 2),
('11', 3),
('12', 1),
('13', 2),
('14', 3),
('15', 1),
('16', 2),
('17', 3),
('18', 1),
('19', 2),
('20', 3);

-- Insertar registros en la tabla rendimiento_estudiante
INSERT INTO rendimiento_estudiante (id, id_usuario, rendimiento_academico, manejo_instrumentos, interpretacion, creatividad, trabajo_equipo) VALUES
('3', '3', 4, 5, 4, 3, 5),
('4', '4', 5, 4, 3, 5, 4),
('8', '8', 3, 2, 4, 3, 2),
('9', '9', 4, 3, 5, 4, 3),
('10', '10', 5, 4, 3, 5, 4),
('11', '11', 4, 5, 4, 3, 5),
('12', '12', 3, 2, 4, 3, 2),
('13', '13', 4, 3, 5, 4, 3),
('14', '14', 5, 4, 3, 5, 4),
('15', '15', 4, 5, 4, 3, 5),
('16', '16', 3, 2, 4, 3, 2),
('17', '17', 4, 3, 5, 4, 3),
('18', '18', 5, 4, 3, 5, 4),
('19', '19', 4, 5, 4, 3, 5),
('20', '20', 3, 2, 4, 3, 2);