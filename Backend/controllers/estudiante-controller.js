import connection from '../db/connection.js';

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
                p.nombre AS programa, 
                GROUP_CONCAT(c.nombre SEPARATOR ', ') AS curso, 
                GROUP_CONCAT(c.horario SEPARATOR ', ') AS horario,
                u.status AS activo
            FROM 
                usuarios u
            JOIN 
                alumnos a ON u.id = a.id_usuario
            LEFT JOIN 
                alumnos_cursos ac ON a.id_usuario = ac.alumno_id
            LEFT JOIN 
                cursos c ON ac.curso_id = c.id
            LEFT JOIN 
                programas p ON a.programa_id = p.id
            WHERE 
                u.rol = 'Alumno'
            GROUP BY 
                u.id, u.nombre, u.apellido, u.email, a.identidad, a.fecha_nacimiento, p.nombre, u.status
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