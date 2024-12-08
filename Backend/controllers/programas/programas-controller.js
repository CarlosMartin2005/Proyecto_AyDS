import connection from '../../db/connection.js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import { validateRegister } from './../../schemas/auth.schema.js';
import bcrypt from "bcrypt";

export class ProgramasController {

    static getInfo(req, res) {
        const query = `
        SELECT 
          p.id AS programa_id, 
          p.nombre AS programa_nombre, 
          p.descripcion AS programa_descripcion,
          p.fecha_creacion AS programa_fecha_creacion,
          p.fecha_fin AS programa_fecha_fin,
          c.id AS curso_id, 
          c.nombre AS curso_nombre, 
          c.horario AS curso_horario, 
          c.descripcion AS curso_descripcion, 
          c.fecha_creacion AS curso_fecha_creacion, 
          c.fecha_fin AS curso_fecha_fin, 
          d.especialidad AS docente_especialidad, 
          u.id AS docente_id, 
          u.nombre AS docente_nombre, 
          u.apellido AS docente_apellido
        FROM 
          programas p
        LEFT JOIN 
          cursos c ON p.id = c.programa_id
        LEFT JOIN 
          docentes d ON c.docente_id = d.id_usuario
        LEFT JOIN 
          usuarios u ON d.id_usuario = u.id
        ORDER BY 
          p.id, c.id;`
    
        try {
            connection.query(query, (error, results) => {
    
            if (error) {
              return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos: " + error
              })
            }
    
            const programas = results.reduce((acc, row) => {
              const { 
                programa_id, programa_nombre, programa_descripcion, curso_id, curso_nombre, curso_horario, docente_nombre, docente_apellido, programa_fecha_creacion, programa_fecha_fin, curso_fecha_creacion, curso_fecha_fin, docente_especialidad, curso_descripcion, docente_id
            } = row;
              let programa = acc.find(p => p.id === programa_id);
              if (!programa) {
                programa = {
                  id: programa_id,
                  nombre: programa_nombre,
                  descripcion: programa_descripcion,
                  fechaCreacion: programa_fecha_creacion,
                  ultimaActualizacion: programa_fecha_fin,
                  cursos: []
                };
                acc.push(programa);
              }
              if (curso_id) {
                const curso = {
                  id: curso_id,
                  docente_id: docente_id,
                  nombre: curso_nombre,
                  horario: curso_horario,
                  docente: `${docente_nombre} ${docente_apellido}`,
                  docente_especialidad: docente_especialidad,
                  descripcion: curso_descripcion,
                  fechaCreacion: curso_fecha_creacion,
                  ultimaActualizacion: curso_fecha_fin,
                }
                programa.cursos.push(curso);
              }
              return acc;
            }, []);
    
            return res
              .header('Content-Type', 'application/json')
              .status(200)
              .json(programas);
          });
        }
        catch (error) {
          return res.status(400).json({
            error: true,
            message: "Ocurrió un error al obtener los datos " + error
          });
        }
      }

    static addPrograma(req, res) {
        const { nombre, descripcion } = req.body;
        const query = `INSERT INTO programas ( nombre, descripcion, fecha_creacion, fecha_fin) VALUES (?, ?, ?, ?)`;
        const fechaCreacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try{
            connection.query(query, [nombre, descripcion, fechaCreacion, fechaCreacion], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al agregar el programa: " + error
                    });
                }
                return res.status(200).json({
                    error: false,
                    message: "Programa agregado correctamente"
                });
            });
        }
        catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al agregar el programa: " + error
            });
        }
    }

    static addCurso(req, res) {
        const { nombre, horario, descripcion, programa_id, docente_id } = req.body;
        const query = `INSERT INTO cursos ( nombre, horario, descripcion, programa_id, docente_id, fecha_creacion, fecha_fin) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const fechaCreacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try{
            connection.query(query, [nombre, horario, descripcion, programa_id, docente_id, fechaCreacion, fechaCreacion], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al agregar el curso: " + error
                    });
                }
                return res.status(200).json({
                    error: false,
                    message: "Curso agregado correctamente"
                });
            });
        }
        catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al agregar el curso: " + error
            });
        }
        
    }

    static editPrograma(req, res) {
        const { id, nombre, descripcion } = req.body;
        const query = `UPDATE programas SET nombre = ?, descripcion = ?, fecha_fin = ? 
        WHERE id = ?`;
        const fechaActualizacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try{
            connection.query(query, [nombre, descripcion, fechaActualizacion, id], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al editar el programa: " + error
                    });
                }
                return res.status(200).json({
                    error: false,
                    message: "Programa editado correctamente"
                });
            });
        }
        catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al editar el programa: " + error
            });
        }
    }

    static editCurso(req, res) {
        const { id, nombre, horario, descripcion, programa_id, docente_id } = req.body;
        const query = `UPDATE cursos SET nombre = ?, horario = ?, descripcion = ?, programa_id = ?, docente_id = ?, fecha_fin = ? 
        WHERE id = ?`;
        const fechaActualizacion = new Date().toISOString().slice(0, 19).replace('T', ' ');
        try{
            connection.query(query, [nombre, horario, descripcion, programa_id, docente_id, fechaActualizacion, id], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al editar el curso: " + error
                    });
                }
                return res.status(200).json({
                    error: false,
                    message: "Curso editado correctamente"
                });
            });
        }
        catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al editar el curso: " + error
            });
        }
        
    }

    static deletePrograma(req, res) {
        const { id } = req.body;
        const query = `DELETE FROM programas WHERE id = ?`;
        if(!id) {
            return res.status(400).json({
                error: true,
                message: "Debe proporcionar un id"
            });
        }
        try{
            connection.query(query, [id], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al eliminar el programa: " + error
                    });
                }
                return res.status(200).json({
                    error: false,
                    message: "Programa eliminado correctamente"
                });
            });
        }
        catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al eliminar el programa: " + error
            });
        }
        
    }

    static deleteCurso(req, res) {
        const { id } = req.body;
        const query = `DELETE FROM cursos WHERE id = ?`;
        if (!id) {
            return res.status(400).json({
                error: true,
                message: "Debe proporcionar un id"
            });
        }
        try{
            connection.query(query, [id], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al eliminar el curso: " + error
                    });
                }
                console.log(results);
                return res.status(200).json({
                    error: false,
                    message: "Curso eliminado correctamente" 
                });
            });
        }
        catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al eliminar el curso: " + error
            });
        }
        
    }
}