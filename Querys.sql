-- create database Proy_AyDS;

-- use Proy_AyDS

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    lugar_nacimiento VARCHAR(100),
    fecha_nacimiento DATE,
    direccion VARCHAR(255),
    identidad VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    institucion_procedencia VARCHAR(100),
    correo VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(100) NOT NULL,
    instrumento VARCHAR(50),
    programa_id INT,
    curso_id INT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, lugar_nacimiento, fecha_nacimiento, direccion, identidad, telefono, institucion_procedencia, correo, contraseña, instrumento, programa_id, curso_id) 
VALUES 
('Juan Pérez', 'Tegucigalpa', '1990-01-01', '123 Calle Principal', '0801199000011', '9999-9999', 'Instituto Nacional', 'juan.perez@example.com', '1234', 'Guitarra', NULL, NULL),
('Maria García', 'San Pedro Sula', '1988-05-12', '456 Avenida Secundaria', '0801198800022', '8888-8888', 'Escuela Secundaria', 'maria.garcia@example.com', '5678', 'Piano', NULL, NULL);

select * from usuarios