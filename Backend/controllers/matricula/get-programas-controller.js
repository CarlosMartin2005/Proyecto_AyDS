import connection from '../../db/connection.js';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';

export class getProgramasController {

  static getInfo(req, res) {
    const query = `
    SELECT 
      p.id AS programa_id, 
      p.nombre AS programa_nombre, 
      p.descripcion AS programa_descripcion,
      c.id AS curso_id, 
      c.nombre AS curso_nombre, 
      c.horario AS curso_horario, 
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
          const { programa_id, programa_nombre, programa_descripcion, curso_id, curso_nombre, curso_horario, docente_nombre, docente_apellido } = row;
          const programa = acc.find(p => p.id === programa_id);
          if (!programa) {
            acc.push({
              id: programa_id,
              nombre: programa_nombre,
              descripcion: programa_descripcion,
              cursos: []
            });
          }
          const curso = {
            id: curso_id,
            nombre: curso_nombre,
            horario: curso_horario,
            docente: `${docente_nombre} ${docente_apellido}`
          }
          acc.find(p => p.id === programa_id).cursos.push(curso);
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
  

}

