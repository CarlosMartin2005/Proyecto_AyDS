import connection from '../../db/connection.js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { validateRegister } from './../../schemas/auth.schema.js';
import bcrypt from "bcrypt";

export class DocentesController {

    static getDocentes(req, res) {
        const query = `
        SELECT 
          u.id AS docente_id, 
          u.nombre AS docente_nombre, 
          u.apellido AS docente_apellido, 
          u.email AS docente_email, 
          u.fecha_creacion AS docente_fecha_creacion, 
          u.fecha_actualizacion AS docente_fecha_actualizacion, 
          d.especialidad AS docente_especialidad
        FROM
            usuarios u
        LEFT JOIN
            docentes d ON u.id = d.id_usuario
        WHERE
            u.rol = 'docente'
        ORDER BY
            u.id;
        `
        try {
            connection.query(query, (error, results) => {

            if (error) {
              return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos: " + error
              })
            }

            const docentes = results.map(row => {
              const { 
                docente_id, docente_nombre, docente_apellido, docente_email, docente_fecha_creacion, docente_fecha_actualizacion, docente_especialidad
            } = row;
              return {
                id: docente_id,
                nombre: docente_nombre,
                apellido: docente_apellido,
                email: docente_email,
                fechaCreacion: docente_fecha_creacion,
                ultimaActualizacion: docente_fecha_actualizacion,
                especialidad: docente_especialidad
              }
            });

            return res.status(200).json(docentes);
          });
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos: " + error
            })
        }

    }
}