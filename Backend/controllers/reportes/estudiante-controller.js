import connection from '../../db/connection.js';

export class EstudianteController {
    static async getAllEstudiantes(req, res) {
        const consulta = `
            SELECT 
                u.id, 
                u.nombre AS nombres, 
                u.apellido AS apellidos, 
                u.email, 
                a.identidad, 
                a.fecha_nacimiento AS fecha_de_nacimiento, 
                GROUP_CONCAT(DISTINCT p.nombre SEPARATOR ', ') AS programa, 
                GROUP_CONCAT(DISTINCT c.nombre SEPARATOR ', ') AS curso, 
                GROUP_CONCAT(DISTINCT c.horario SEPARATOR ', ') AS horario,
                u.status AS activo
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
                cursos c ON ac.curso_id = c.id
            WHERE 
                u.rol = 'Alumno'
            GROUP BY 
                u.id, u.nombre, u.apellido, u.email, a.identidad, a.fecha_nacimiento, u.status
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