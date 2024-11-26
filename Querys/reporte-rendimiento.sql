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
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_docente CHAR(36)
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
	('108351c3-2a81-4c21-9fdb-d31e461f123s', '108351c3-2a81-4c21-9fdb-d31e461f6521', 5, 5,5,5,5),
    ('fcc8c721-c0cd-4d36-b7c7-cf0c7adsd', 'fcc8c721-c0cd-4d36-b7c7-cf0c7a7e06c3', 3, 5,4,5,5),
    ('50ceaeca-76f3-4d39-8ac8-c5211781', '50ceaeca-76f3-4d39-8ac8-c5211781b387', 4, 3,4,2,1),
    ('d18042bc-9a46-4bb7-8ade-a9ae7b8', 'd18042bc-9a46-4bb7-8ade-a9ae7225eeb8', 1, 1,1,1,1),
    ('92accc64-723a-48d1-b451-6b3f72', '92accc64-723a-48d1-b451-6b3f7290a54f', 2, 2,1,2,1),
    ('6445f697-3407-4687-8464-720d57', '6445f697-3407-4687-8464-727488cd0d57', 5, 1,1,4,3);
    
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
    
    
    SELECT 
    
    u.nombre,
    u.apellido,
    u.email,
    a.fecha_nacimiento,
    a.identidad,
    AVG(r.rendimiento_academico) AS promedio_rendimiento_academico,
    AVG(r.manejo_instrumentos) AS promedio_manejo_instrumentos,
    AVG(r.interpretacion) AS promedio_interpretacion,
    AVG(r.creatividad) AS promedio_creatividad,
    AVG(r.trabajo_equipo) AS promedio_trabajo_equipo
FROM 
    Proy_AyDS.usuarios u 
JOIN 
    Proy_AyDS.alumnos a ON u.id = a.id_usuario 
JOIN 
    Proy_AyDS.rendimiento_estudiante r ON u.id = r.id_usuario 
WHERE 
    u.id = '4'
GROUP BY 
	u.nombre, u.apellido, u.email, a.fecha_nacimiento, a.identidad;