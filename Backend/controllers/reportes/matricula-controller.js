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
}