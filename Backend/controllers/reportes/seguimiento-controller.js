import connection from '../../db/connection.js';

export class SeguimientoController {
    static async getAllSeguimiento(req, res) {
        const consulta = `
            SELECT DISTINCT
                u.id,
                u.nombre AS nombres, 
                u.apellido AS apellidos, 
                u.email, 
                p.nombre AS programa, 
                c.nombre AS curso, 
                ac.nota, 
                u.status AS activo
            FROM 
                usuarios u
            JOIN 
                alumnos a ON u.id = a.id_usuario
            JOIN 
                alumnos_programas ap ON a.id_usuario = ap.alumno_id
            JOIN 
                programas p ON ap.programa_id = p.id
            JOIN 
                alumnos_cursos ac ON a.id_usuario = ac.alumno_id
            JOIN 
                cursos c ON ac.curso_id = c.id AND c.programa_id = p.id
            WHERE 
                u.rol = 'Alumno'
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