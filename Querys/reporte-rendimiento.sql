use Proy_AyDS;

DROP TABLE IF EXISTS rendimiento_estudiante;

CREATE TABLE rendimiento_estudiante(
    id CHAR(36) PRIMARY KEY,
    id_usuario CHAR(36) NOT NULL,
    rendimiento_academico TINYINT CHECK (rendimiento_academico IN (1, 2, 3, 4, 5)),
    manejo_instrumentos TINYINT CHECK (manejo_instrumentos IN (1, 2, 3, 4, 5)),
    interpretacion TINYINT CHECK (interpretacion IN (1, 2, 3, 4, 5)),
    creatividad TINYINT CHECK (creatividad IN (1, 2, 3, 4, 5)),
    trabajo_equipo TINYINT CHECK (trabajo_equipo IN (1, 2, 3, 4, 5)),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO rendimiento_estudiante (
	id, 
	id_usuario, 
    rendimiento_academico, 
    manejo_instrumentos,
    interpretacion,
    creatividad,
    trabajo_equipo
    ) VALUES
	('asdeereev23qfqsdfw', '3', 5, 5,5,5,5),
    ('asdeereev23fdsdqfqw', '3', 5, 5,5,5,5),
    ('fgnhddsfff45ngh', '4', 4, 2,1,3,3);
    
    SELECT 
    u.nombre, u.apellido, u.email,
    a.fecha_nacimiento, a.identidad,
    r.rendimiento_academico, r.manejo_instrumentos,
    r.interpretacion, r.creatividad, r.trabajo_equipo, r.fecha_creacion
FROM 
    Proy_AyDS.usuarios u
JOIN 
    Proy_AyDS.alumnos a ON u.id = a.id_usuario
JOIN 
    Proy_AyDS.rendimiento_estudiante r ON u.id = r.id_usuario
WHERE 
    u.id = 3;