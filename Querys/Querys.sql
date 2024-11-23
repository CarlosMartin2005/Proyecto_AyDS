-- create database Proy_AyDS;

-- use Proy_AyDS

DROP TABLE IF EXISTS accounts;

create table accounts(
	id char(36) not null,
    firstName varchar(50) not null,
    lastName varchar(50) not null,
    email VARCHAR(50) not null,
    username varchar(100) null,
    password_hash varchar(255) not null,
    must_change_password varchar(255),
    status char(1),

    constraint pkAccountsID primary key (id)
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

-- Por si hacemos la lógica del único usuario SUPER desde la base de datos (no creo)
-- ALTER TABLE usuarios 
-- ADD CONSTRAINT unico_super CHECK (rol != 'Super' OR id = (SELECT id FROM usuarios WHERE rol = 'Super' LIMIT 1));


CREATE TABLE programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);


CREATE TABLE alumnos (
    id_usuario CHAR(36) PRIMARY KEY,
    lugar_nacimiento VARCHAR(100),
    fecha_nacimiento DATE NOT NULL,
    direccion VARCHAR(255),
    identidad VARCHAR(20) UNIQUE NOT NULL,
    telefono VARCHAR(15),
    institucion_procedencia VARCHAR(100),
    instrumento VARCHAR(50),
    programa_id INT,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id),
    FOREIGN KEY (programa_id) REFERENCES programas(id)
);


CREATE TABLE docentes (
    id_usuario CHAR(36) PRIMARY KEY,
    especialidad VARCHAR(100),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


CREATE TABLE cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    horario VARCHAR(50) NOT NULL, -- Ejemplo: "Lunes a Viernes, 8:00 - 12:00"
    programa_id INT NOT NULL,
    docente_id CHAR(36) NULL,
    FOREIGN KEY (programa_id) REFERENCES programas(id) ON DELETE CASCADE,
    FOREIGN KEY (docente_id) REFERENCES usuarios(id) ON DELETE SET NULL
);


-- Un alumno puede estar matriculado a varios cursos
CREATE TABLE alumnos_cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id CHAR(36) NOT NULL,
    curso_id INT NOT NULL,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);


-- Un docente puede dominar varios instrumentos, por lo tanto, ser elegible para más cursos
CREATE TABLE docentes_cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    docente_id CHAR(36) NOT NULL,
    curso_id INT NOT NULL,
    FOREIGN KEY (docente_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
);
