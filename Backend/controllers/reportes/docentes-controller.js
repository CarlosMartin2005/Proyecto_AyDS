import connection from '../../db/connection.js';

export class DocentesController {
    static async getAllDocentes(req, res) {
        const { startDate, endDate } = req.query;
        let consulta = `
            SELECT 
                u.id, 
                u.nombre AS nombres, 
                u.apellido AS apellidos, 
                u.email, 
                u.numeroCuenta,
                u.identidad,
                u.fecha_nacimiento AS fecha_de_nacimiento,
                u.status,
                d.especialidad, 
                GROUP_CONCAT(c.nombre SEPARATOR ', ') AS cursos
            FROM 
                usuarios u
            JOIN 
                docentes d ON u.id = d.id_usuario
            LEFT JOIN 
                docentes_cursos dc ON d.id_usuario = dc.docente_id
            LEFT JOIN 
                cursos c ON dc.curso_id = c.id
            WHERE 
                u.rol = 'Docente'
        `;

        if (startDate && endDate) {
            consulta += ` AND u.fecha_creacion BETWEEN '${startDate}' AND '${endDate}'`;
        }

        consulta += `
            GROUP BY 
                u.id, u.nombre, u.apellido, u.email, d.especialidad
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