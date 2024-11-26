import connection from '../../db/connection.js';

export class MatriculaController {
    static async getAllMatricula(req, res) {
        const consulta = `
            SELECT 
                a.id_usuario AS id_alumno,
                CONCAT(u.nombre, ' ', u.apellido) AS nombre_completo,
                a.identidad AS numero_identidad,
                a.fecha_nacimiento AS fecha,
                GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') AS programas
            FROM 
                alumnos a
            JOIN 
                usuarios u ON a.id_usuario = u.id
            LEFT JOIN 
                alumnos_programas ap ON a.id_usuario = ap.alumno_id
            LEFT JOIN 
                programas p ON ap.programa_id = p.id
            WHERE 
                u.rol = 'Alumno'
            GROUP BY 
                a.id_usuario, u.nombre, u.apellido, a.identidad, a.fecha_nacimiento
        `;
        try {
            connection.query(consulta, (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    });
                }
                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(result);
            });
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos " + error
            });
        }
    }

    static async getAllCursos(req, res) {
        const consulta = `
            SELECT 
                c.id,
                c.nombre,
                c.descripcion,
                c.horario,
                c.programa_id,
                p.nombre AS programa,
                GROUP_CONCAT(ac.alumno_id) AS alumnos,
                CONCAT(u.nombre, ' ', u.apellido) AS docente
            FROM 
                cursos c
            JOIN 
                programas p ON c.programa_id = p.id
            LEFT JOIN 
                alumnos_cursos ac ON c.id = ac.curso_id
            LEFT JOIN 
                usuarios u ON c.docente_id = u.id
            GROUP BY 
                c.id, c.nombre, c.descripcion, c.horario, c.programa_id, p.nombre, u.nombre, u.apellido
        `;
        try {
            connection.query(consulta, (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    });
                }
                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(result);
            });
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos " + error
            });
        }
    }
}