-- create database Proy_AyDS;

-- use Proy_AyDS

DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts(
    id CHAR(36) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    username VARCHAR(100) NULL,
    password_hash VARCHAR(255) NOT NULL,
    must_change_password VARCHAR(255),
    status CHAR(1),
    CONSTRAINT pkAccountsID PRIMARY KEY (id)
);

CREATE TABLE usuarios (
    id CHAR(36) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('Super', 'Docente', 'Alumno') NOT NULL,
    status CHAR(1) DEFAULT 'A',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS programas;
CREATE TABLE programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

DROP TABLE IF EXISTS alumnos;
CREATE TABLE alumnos (
    id_usuario CHAR(36) PRIMARY KEY,
    lugar_nacimiento VARCHAR(100),
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(255),
    identidad VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    institucion_procedencia VARCHAR(100),
    instrumento VARCHAR(50),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (programa_id) REFERENCES programas(id)
);

DROP TABLE IF EXISTS docentes;
CREATE TABLE docentes (
    id_usuario CHAR(36) PRIMARY KEY,
    especialidad VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

DROP TABLE IF EXISTS cursos;
CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    horario VARCHAR(50) NOT NULL,
    programa_id INT NOT NULL,
    docente_id CHAR(36) NULL,
    FOREIGN KEY (programa_id) REFERENCES programas(id) ON DELETE CASCADE,
    FOREIGN KEY (docente_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

DROP TABLE IF EXISTS alumnos_cursos;
-- Un alumno puede estar matriculado a varios cursos
CREATE TABLE alumnos_cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id CHAR(36) NOT NULL,
    curso_id INT NOT NULL,
    nota DECIMAL(5, 2),
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS docentes_cursos;
-- Un docente puede dominar varios instrumentos, por lo tanto, ser elegible para más cursos
CREATE TABLE docentes_cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    docente_id CHAR(36) NOT NULL,
    curso_id INT NOT NULL,
    FOREIGN KEY (docente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS alumnos_programas;
-- Un alumno puede estar matriculado a varios programas
CREATE TABLE alumnos_programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id CHAR(36) NOT NULL,
    programa_id INT NOT NULL,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (programa_id) REFERENCES programas(id) ON DELETE CASCADE
);

-- Modificar la tabla usuarios para permitir la inserción de fechas de creación manualmente
ALTER TABLE usuarios
MODIFY COLUMN fecha_creacion TIMESTAMP NULL DEFAULT NULL;

-- Modificar la tabla programas para permitir la inserción de fechas de creación manualmente
ALTER TABLE programas
ADD COLUMN fecha_creacion TIMESTAMP NULL DEFAULT NULL;

-- Modificar la tabla cursos para permitir la inserción de fechas de creación manualmente
ALTER TABLE cursos
ADD COLUMN fecha_creacion TIMESTAMP NULL DEFAULT NULL;