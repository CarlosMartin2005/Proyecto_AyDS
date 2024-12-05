import conexion from '../../db/conexion.js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { validateRegister } from './../../schemas/auth.schema.js';
import bcrypt from "bcrypt";

export class RegisterAlumnoController {
    static async registerAlumno(req, res) {
        const {
            nombre,
            apellido,
            telefono,
            identidad,
            lugarNacimiento,
            fechaNacimiento,
            direccion,
            institucionProcedencia,
            instrumento,
            email,
            password,
            terms,
            programas,
        } = req.body
        const rol = 'Alumno'
        const status = 'I'

        const data1 = req.body;
        const data = { ...data1, rol, status };

        const { success, error } = validateRegister(data);
        const queryCheckEmail = `SELECT email FROM usuarios WHERE email = ?`;
        const consulta = `INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol, status, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const queryAlumno = `INSERT INTO alumnos (id_usuario, lugar_nacimiento, fecha_nacimiento, direccion, identidad, telefono, institucion_procedencia, instrumento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const queryAlumnosPrograma = `INSERT INTO alumnos_programas (alumno_id, programa_id) VALUES (?, ?)`;
        const queryAlumnosCursos = `INSERT INTO alumnos_cursos (alumno_id, curso_id, nota, fecha_matricula) VALUES (?, ?, ?, ?)`;



        if (!success) {
            res.status(400).json({
                message: JSON.parse(error.message)
            })
        }

        const connection = await conexion.getConnection();
        await connection.beginTransaction();

        try {
            const id = uuidv4();
            const password_hash = await bcrypt.hash(password, 10);
            const fecha_creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const [emailResults] = await connection.query(queryCheckEmail, [email]);
            if (emailResults.length > 0) {
                await connection.rollback();
                return res.status(400).json({
                    error: true,
                    message: "El correo ya está registrado"
                });
            }

            await connection.query(consulta, [id, nombre, apellido, email, null, password_hash, rol ?? 'Alumno', status ?? 'I', fecha_creacion, fecha_creacion]);
            await connection.query(queryAlumno, [id, lugarNacimiento, fechaNacimiento, direccion, identidad, telefono, institucionProcedencia, instrumento]);

            for (const programa of programas) {
                await connection.query(queryAlumnosPrograma, [id, programa.id]);
                for (const curso of programa.cursos) {
                    await connection.query(queryAlumnosCursos, [id, curso.id, null, fecha_creacion]);
                }
            }

            await connection.commit();
            return res.status(200).json({
                error: false,
                message: "Alumno registrado correctamente"
            });
        } 
        catch (error) {
            await connection.rollback();
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al registrar el alumno: " + error
            });
        } 
        finally {
            connection.release();
        }
    }
}