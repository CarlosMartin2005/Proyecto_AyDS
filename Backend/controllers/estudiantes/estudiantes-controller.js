import connection from '../../db/connection.js';
import conexion from '../../db/conexion.js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { validateRegister } from './../../schemas/auth.schema.js';
import bcrypt from "bcrypt";

export class EstudianteController {

    static getEstudiantes(req, res) {
        const query = `
            SELECT
                u.id,
                u.nombre AS nombres,
                u.apellido AS apellidos,
                u.email,
                u.numeroCuenta,
                a.identidad,
                a.fecha_nacimiento AS fecha_de_nacimiento,
                p.id AS programa_id,
                p.nombre AS programa_nombre,
                c.id AS curso_id,
                c.nombre AS curso_nombre,
                c.horario AS curso_horario,
                c.descripcion AS curso_descripcion,
                c.programa_id AS curso_programa_id,
                c.fecha_creacion AS curso_fecha_creacion,
                c.docente_id AS curso_docente_id,
                c.fecha_fin AS curso_fecha_fin,
                u.status AS activo,
                u.fecha_creacion AS fecha_creacion,
                ac.fecha_matricula AS fecha_matricula
            FROM
                usuarios u
            JOIN
                alumnos a ON u.id = a.id_usuario
            LEFT JOIN
                alumnos_programas ap ON a.id_usuario = ap.alumno_id
            LEFT JOIN
                programas p ON ap.programa_id = p.id
            LEFT JOIN
                alumnos_cursos ac ON a.id_usuario = ac.alumno_id
            LEFT JOIN
                cursos c ON ac.curso_id = c.id AND c.programa_id = p.id
            WHERE
                u.rol = 'Alumno'
        `;

        try {
            connection.query(query, (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    });
                }

                const estudiantesMap = new Map();

                results.forEach(row => {
                    const {
                        id, nombres, apellidos, email, numeroCuenta, identidad, fecha_de_nacimiento, programa_id, programa_nombre,
                        curso_id, curso_nombre, curso_horario, curso_descripcion, curso_programa_id, curso_fecha_creacion, curso_docente_id, curso_fecha_fin,
                        activo, fecha_creacion, fecha_matricula
                    } = row;

                    if (!estudiantesMap.has(id)) {
                        estudiantesMap.set(id, {
                            id,
                            nombres,
                            apellidos,
                            email,
                            numeroCuenta,
                            identidad,
                            fecha_de_nacimiento,
                            activo,
                            fecha_creacion,
                            fecha_matricula,
                            programas: []
                        });
                    }

                    if (programa_id) {
                        let programa = estudiantesMap.get(id).programas.find(p => p.id === programa_id);
                        if (!programa) {
                            programa = {
                                id: programa_id,
                                nombre: programa_nombre,
                                cursos: []
                            };
                            estudiantesMap.get(id).programas.push(programa);
                        }

                        if (curso_id) {
                            programa.cursos.push({
                                id: curso_id,
                                nombre: curso_nombre,
                                horario: curso_horario,
                                descripcion: curso_descripcion,
                                fecha_creacion: curso_fecha_creacion,
                                docente_id: curso_docente_id,
                                fecha_fin: curso_fecha_fin
                            });
                        }
                    }
                });

                const estudiantes = Array.from(estudiantesMap.values());

                return res.status(200).json(estudiantes);
            });
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos: " + error
            });
        }
    }

    static async editEstudiante(req, res) {
        const { id, nombre, apellido, email, identidad, fechaNacimiento, status } = req.body;

        if (!id || !nombre || !apellido || !email || !identidad || !fechaNacimiento || !status) {
            return res.status(400).json({
                error: true,
                message: "Todos los campos son obligatorios"
            });
        }

        const statusFinal = status === 'Activo' ? 'A' : 'I';

        const queryEmail = `
            SELECT email FROM usuarios WHERE email = ? AND id != ?;
        `;
        const queryIdentidad = `
            SELECT identidad FROM usuarios WHERE identidad = ? AND id != ?;
        `;
        const queryUsuarios = `
            UPDATE usuarios
            SET nombre = ?, apellido = ?, email = ?, status = ?, fecha_nacimiento = ?, identidad = ?, fecha_actualizacion = NOW()
            WHERE id = ?;
        `;
        const connectionPromise = await conexion.getConnection();
        await connectionPromise.beginTransaction();
        console.log("statusFinal", statusFinal);

        try {
            const [rowsEmail] = await connectionPromise.query(queryEmail, [email, id]);
            const [rowsIdentidad] = await connectionPromise.query(queryIdentidad, [identidad, id]);

            if (rowsEmail.length > 0) {
                return res.status(400).json({
                    error: true,
                    message: "El email ya existe"
                });
            }

            if (rowsIdentidad.length > 0) {
                return res.status(400).json({
                    error: true,
                    message: "La identidad ya existe"
                });
            }

            await connectionPromise.query(queryUsuarios, [nombre, apellido, email, statusFinal, fechaNacimiento, identidad, id]);

            await connectionPromise.commit();

            return res.status(200).json({
                message: "Estudiante editado correctamente"
            });

        } catch (error) {
            await connectionPromise.rollback();
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al editar el estudiante: " + error
            });
        }
    }

    static async editMatricula(req, res) {
        const { id_estudiante, programas } = req.body;

        if (!id_estudiante || !programas) {
            return res.status(400).json({
                error: true,
                message: "El campo 'id_estudiante' y 'programas' son obligatorios"
            });
        }

        const queryDeleteProgramas = `
            DELETE FROM alumnos_programas WHERE alumno_id = ?;
        `;
        const queryInsertProgramas = `
            INSERT INTO alumnos_programas (alumno_id, programa_id) VALUES (?, ?);
        `;
        const queryDeleteCursos = `
            DELETE FROM alumnos_cursos WHERE alumno_id = ?;
        `;
        const queryInsertCursos = `
            INSERT INTO alumnos_cursos (alumno_id, curso_id) VALUES (?, ?);
        `;
        const connectionPromise = await conexion.getConnection();
        await connectionPromise.beginTransaction();

        try {
            await connectionPromise.query(queryDeleteProgramas, [id_estudiante]);
            await connectionPromise.query(queryDeleteCursos, [id_estudiante]);

            for (const programa of programas) {
                await connectionPromise.query(queryInsertProgramas, [id_estudiante, programa.id]);
                for (const curso of programa.cursos) {
                    if (curso.seleccionado) {
                        await connectionPromise.query(queryInsertCursos, [id_estudiante, curso.id]);
                    }
                }
            }

            await connectionPromise.commit();

            return res.status(200).json({
                message: "Matrícula editada correctamente"
            });

        } catch (error) {
            await connectionPromise.rollback();
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al editar la matrícula: " + error
            });
        }
    }

    static async deleteEstudiante(req, res) {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                error: true,
                message: "El campo 'id' es obligatorio"
            });
        }

        const queryUsuarios = `
            DELETE FROM usuarios WHERE id = ?;
        `;
        const queryAlumnos = `
            DELETE FROM alumnos WHERE id_usuario = ?;
        `;
        const queryDeleteProgramas = `
            DELETE FROM alumnos_programas WHERE alumno_id = ?;
        `;
        const queryDeleteCursos = `
            DELETE FROM alumnos_cursos WHERE alumno_id = ?;
        `;
        const connectionPromise = await conexion.getConnection();
        await connectionPromise.beginTransaction();

        try {
            await connectionPromise.query(queryUsuarios, [id]);
            await connectionPromise.query(queryAlumnos, [id]);
            await connectionPromise.query(queryDeleteProgramas, [id]);
            await connectionPromise.query(queryDeleteCursos, [id]);

            await connectionPromise.commit();
            connectionPromise.release();

            return res.status(200).json({
                message: "Estudiante eliminado correctamente"
            });
        } catch (error) {
            await connectionPromise.rollback();
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al eliminar el estudiante: " + error
            });
        }
    }

}