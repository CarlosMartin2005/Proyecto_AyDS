-- Insertar registros en la tabla usuarios con fechas de creación manuales
INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol, status, fecha_creacion)
VALUES 
('21', 'Juan', 'Pérez', 'juan.perez2@example.com', 'juanperez2', 'hashed_password_21', 'Docente', 'A', '2024-01-01 10:00:00'),
('22', 'María', 'González', 'maria.gonzalez2@example.com', 'mariagonzalez2', 'hashed_password_22', 'Docente', 'A', '2024-01-02 11:00:00'),
('23', 'Carlos', 'López', 'carlos.lopez2@example.com', 'carloslopez2', 'hashed_password_23', 'Alumno', 'A', '2024-01-03 12:00:00'),
('24', 'Ana', 'Martínez', 'ana.martinez2@example.com', 'anamartinez2', 'hashed_password_24', 'Alumno', 'A', '2024-01-04 13:00:00'),
('25', 'Luis', 'Rodríguez', 'luis.rodriguez2@example.com', 'luisrodriguez2', 'hashed_password_25', 'Docente', 'A', '2024-01-05 14:00:00'),
('26', 'Pedro', 'Gómez', 'pedro.gomez@example.com', 'pedrogomez', 'hashed_password_26', 'Alumno', 'A', '2024-01-06 15:00:00'),
('27', 'Laura', 'Fernández', 'laura.fernandez@example.com', 'laurafernandez', 'hashed_password_27', 'Alumno', 'A', '2024-01-07 16:00:00'),
('28', 'Miguel', 'Ramírez', 'miguel.ramirez@example.com', 'miguelramirez', 'hashed_password_28', 'Alumno', 'A', '2024-01-08 17:00:00'),
('29', 'Sofía', 'Torres', 'sofia.torres@example.com', 'sofiatorres', 'hashed_password_29', 'Alumno', 'A', '2024-01-09 18:00:00'),
('30', 'David', 'Mendoza', 'david.mendoza@example.com', 'davidmendoza', 'hashed_password_30', 'Alumno', 'A', '2024-01-10 19:00:00'),
('31', 'Daniela', 'Ruiz', 'daniela.ruiz@example.com', 'danielaruiz', 'hashed_password_31', 'Alumno', 'A', '2024-01-11 20:00:00'),
('32', 'Jorge', 'Sánchez', 'jorge.sanchez@example.com', 'jorgesanchez', 'hashed_password_32', 'Alumno', 'A', '2024-01-12 21:00:00'),
('33', 'Carla', 'Díaz', 'carla.diaz@example.com', 'carladiaz', 'hashed_password_33', 'Alumno', 'A', '2024-01-13 22:00:00'),
('34', 'Andrés', 'López', 'andres.lopez@example.com', 'andreslopez', 'hashed_password_34', 'Alumno', 'A', '2024-01-14 23:00:00'),
('35', 'Paula', 'Martínez', 'paula.martinez@example.com', 'paulamartinez', 'hashed_password_35', 'Alumno', 'A', '2024-01-15 10:00:00'),
('36', 'Fernando', 'García', 'fernando.garcia@example.com', 'fernandogarcia', 'hashed_password_36', 'Alumno', 'A', '2024-01-16 11:00:00'),
('37', 'Elena', 'Hernández', 'elena.hernandez@example.com', 'elenahernandez', 'hashed_password_37', 'Alumno', 'A', '2024-01-17 12:00:00'),
('38', 'Juan', 'Ramírez', 'juan.ramirez@example.com', 'juanramirez', 'hashed_password_38', 'Alumno', 'A', '2024-01-18 13:00:00'),
('39', 'María', 'Gómez', 'maria.gomez@example.com', 'mariagomez', 'hashed_password_39', 'Alumno', 'A', '2024-01-19 14:00:00'),
('40', 'Carlos', 'Fernández', 'carlos.fernandez@example.com', 'carlosfernandez', 'hashed_password_40', 'Alumno', 'A', '2024-01-20 15:00:00');

-- Insertar registros en la tabla docentes
INSERT INTO docentes (id_usuario, especialidad) VALUES
('21', 'Guitarra'),
('22', 'Violín'),
('25', 'Piano');

-- Insertar registros en la tabla programas con fechas de creación manuales
INSERT INTO programas (nombre, descripcion, fecha_creacion)
VALUES 
('Pequeños artistas', 'Programa para niños pequeños', '2024-01-01 10:00:00'),
('Programa Juvenil', 'Programa para jóvenes', '2024-01-02 11:00:00'),
('Cursos libres', 'Cursos abiertos para todos', '2024-01-03 12:00:00'),
('Pequeños artistas', 'Programa para niños pequeños', '2024-04-01 10:00:00'),
('Programa Juvenil', 'Programa para jóvenes', '2024-04-02 11:00:00'),
('Cursos libres', 'Cursos abiertos para todos', '2024-04-03 12:00:00');

-- Insertar registros en la tabla cursos con fechas de creación manuales
INSERT INTO cursos (nombre, descripcion, horario, programa_id, docente_id, fecha_creacion)
VALUES 
('Piano Básico', 'Curso de piano para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 1, '21', '2024-01-01 10:00:00'),
('Piano Avanzado', 'Curso de piano avanzado', 'Lunes a Viernes, 10:00 - 12:00', 1, '21', '2024-01-01 10:00:00'),
('Violín Básico', 'Curso de violín para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 2, '22', '2024-01-02 11:00:00'),
('Violín Avanzado', 'Curso de violín avanzado', 'Lunes a Viernes, 10:00 - 12:00', 2, '22', '2024-01-02 11:00:00'),
('Guitarra Básica', 'Curso de guitarra para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 3, '25', '2024-01-03 12:00:00'),
('Guitarra Avanzada', 'Curso de guitarra avanzado', 'Lunes a Viernes, 10:00 - 12:00', 3, '25', '2024-01-03 12:00:00'),
('Flauta Básica', 'Curso de flauta para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 4, '21', '2024-04-01 10:00:00'),
('Flauta Avanzada', 'Curso de flauta avanzado', 'Lunes a Viernes, 10:00 - 12:00', 4, '21', '2024-04-01 10:00:00'),
('Batería Básica', 'Curso de batería para principiantes', 'Lunes a Viernes, 8:00 - 10:00', 5, '22', '2024-04-02 11:00:00'),
('Batería Avanzada', 'Curso de batería avanzado', 'Lunes a Viernes, 10:00 - 12:00', 5, '22', '2024-04-02 11:00:00');

-- Insertar registros en la tabla alumnos
INSERT INTO alumnos (id_usuario, lugar_nacimiento, fecha_nacimiento, direccion, identidad, telefono, institucion_procedencia, instrumento, programa_id)
VALUES
('23', 'Ciudad A', '2000-01-01', 'Calle Falsa 123', '1234567890', '555-1234', 'Instituto A', 'Piano', 1),
('24', 'Ciudad B', '2001-02-02', 'Avenida Siempre Viva 742', '0987654321', '555-5678', 'Instituto B', 'Violín', 2),
('26', 'Ciudad C', '2002-03-03', 'Calle Nueva 456', '1122334455', '555-7890', 'Instituto C', 'Guitarra', 3),
('27', 'Ciudad D', '2003-04-04', 'Avenida Central 123', '6677889900', '555-4321', 'Instituto D', 'Flauta', 1),
('28', 'Ciudad E', '2004-05-05', 'Calle Principal 789', '9988776655', '555-9876', 'Instituto E', 'Batería', 2),
('29', 'Ciudad F', '2005-06-06', 'Avenida Secundaria 321', '1122446688', '555-6543', 'Instituto F', 'Piano', 3),
('30', 'Ciudad G', '2006-07-07', 'Calle Tercera 654', '2233445566', '555-3210', 'Instituto G', 'Violín', 1),
('31', 'Ciudad H', '2007-08-08', 'Avenida Cuarta 987', '3344556677', '555-7890', 'Instituto H', 'Guitarra', 2),
('32', 'Ciudad I', '2008-09-09', 'Calle Quinta 123', '4455667788', '555-1234', 'Instituto I', 'Flauta', 3),
('33', 'Ciudad J', '2009-10-10', 'Avenida Sexta 456', '5566778899', '555-5678', 'Instituto J', 'Batería', 1),
('34', 'Ciudad K', '2010-11-11', 'Calle Séptima 789', '6677889900', '555-9876', 'Instituto K', 'Piano', 2),
('35', 'Ciudad L', '2011-12-12', 'Avenida Octava 321', '7788990011', '555-6543', 'Instituto L', 'Violín', 3),
('36', 'Ciudad M', '2012-01-01', 'Calle Novena 654', '8899001122', '555-3210', 'Instituto M', 'Guitarra', 1),
('37', 'Ciudad N', '2013-02-02', 'Avenida Décima 987', '9900112233', '555-7890', 'Instituto N', 'Flauta', 2),
('38', 'Ciudad O', '2014-03-03', 'Calle Once 123', '0011223344', '555-1234', 'Instituto O', 'Batería', 3),
('39', 'Ciudad P', '2015-04-04', 'Calle Doce 456', '1122334455', '555-5678', 'Instituto P', 'Piano', 1),
('40', 'Ciudad Q', '2016-05-05', 'Avenida Trece 789', '6677889900', '555-9876', 'Instituto Q', 'Violín', 2);

-- Insertar registros en la tabla alumnos_cursos
INSERT INTO alumnos_cursos (alumno_id, curso_id, nota) VALUES
('23', 1, 85.50),
('23', 2, 90.00),
('24', 3, 88.75),
('24', 4, 92.00),
('26', 5, 45.00),
('26', 6, 50.00),
('27', 7, 55.00),
('27', 8, 40.00),
('28', 9, 60.00),
('28', 10, 70.00),
('29', 1, 75.00),
('29', 2, 80.00),
('30', 3, 85.00),
('30', 4, 90.00),
('31', 5, 95.00),
('31', 6, 100.00),
('32', 7, 65.00),
('32', 8, 70.00),
('33', 9, 75.00),
('33', 10, 80.00),
('34', 1, 85.50),
('34', 2, 90.00),
('35', 3, 88.75),
('35', 4, 92.00),
('36', 5, 45.00),
('36', 6, 50.00),
('37', 7, 55.00),
('37', 8, 40.00),
('38', 9, 60.00),
('38', 10, 70.00),
('39', 1, 75.00),
('39', 2, 80.00),
('40', 3, 85.00),
('40', 4, 90.00);

-- Insertar registros en la tabla alumnos_programas
INSERT INTO alumnos_programas (alumno_id, programa_id) VALUES
('23', 1),
('24', 2),
('26', 3),
('27', 1),
('28', 2),
('29', 3),
('30', 1),
('31', 2),
('32', 3),
('33', 1),
('34', 2),
('35', 3),
('36', 1),
('37', 2),
('38', 3),
('39', 1),
('40', 2);

-- Insertar registros en la tabla rendimiento_estudiante
INSERT INTO rendimiento_estudiante (id, id_usuario, rendimiento_academico, manejo_instrumentos, interpretacion, creatividad, trabajo_equipo) VALUES
('23', '23', 4, 5, 4, 3, 5),
('24', '24', 5, 4, 3, 5, 4),
('26', '26', 3, 2, 4, 3, 2),
('27', '27', 4, 3, 5, 4, 3),
('28', '28', 5, 4, 3, 5, 4),
('29', '29', 4, 5, 4, 3, 5),
('30', '30', 3, 2, 4, 3, 2),
('31', '31', 4, 3, 5, 4, 3),
('32', '32', 5, 4, 3, 5, 4),
('33', '33', 4, 5, 4, 3, 5),
('34', '34', 3, 2, 4, 3, 2),
('35', '35', 4, 3, 5, 4, 3),
('36', '36', 5, 4, 3, 5, 4),
('37', '37', 4, 5, 4, 3, 5),
('38', '38', 3, 2, 4, 3, 2),
('39', '39', 4, 3, 5, 4, 3),
('40', '40', 5, 4, 3, 5, 4);

use Proy_AyDS;

INSERT INTO docentes_cursos (docente_id, curso_id) VALUES
('21', 5),  -- Juan Pérez (Guitarra) - Guitarra Básica
('21', 6),  -- Juan Pérez (Guitarra) - Guitarra Avanzada
('22', 3),  -- María González (Violín) - Violín Básico
('22', 4),  -- María González (Violín) - Violín Avanzado
('22', 9),  -- María González (Violín) - Batería Básica
('22', 10), -- María González (Violín) - Batería Avanzada
('25', 1),  -- Luis Rodríguez (Piano) - Piano Básico
('25', 2),  -- Luis Rodríguez (Piano) - Piano Avanzado
('21', 7),  -- Juan Pérez (Guitarra) - Flauta Básica
('21', 8);  -- Juan Pérez (Guitarra) - Flauta Avanzada

