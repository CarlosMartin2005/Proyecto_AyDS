import connection from '../db/connection.js';

export class ProgramasCursosController {
    static async getAllProgramasCursos(req, res) {
        const consulta = `
            SELECT 
                p.nombre AS programa, 
                c.nombre AS curso, 
                c.horario, 
                CONCAT(u.nombre, ' ', u.apellido) AS docente
            FROM 
                programas p
            JOIN 
                cursos c ON p.id = c.programa_id
            LEFT JOIN 
                usuarios u ON c.docente_id = u.id
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