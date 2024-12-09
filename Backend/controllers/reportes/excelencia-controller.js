import connection from '../../db/connection.js';

export class ExcelenciaController {
    static async getEstudiantesExcelencia(req, res) {
        const { startDate, endDate } = req.query;
        let dateFilter = '';
        if (startDate && endDate) {
            dateFilter = `AND ac.fecha_matricula BETWEEN '${startDate}' AND '${endDate}'`;
        }
        const consulta = `
            SELECT 
                CONCAT(u.nombre, ' ', u.apellido) AS nombre,
                ROUND(AVG(ac.nota), 2) AS promedio,
                a.identidad
            FROM 
                alumnos_cursos ac
            JOIN 
                alumnos a ON ac.alumno_id = a.id_usuario
            JOIN 
                usuarios u ON a.id_usuario = u.id
            WHERE 
                1=1 ${dateFilter}
            GROUP BY 
                ac.alumno_id, a.identidad
            HAVING 
                COUNT(DISTINCT ac.curso_id) > 1 AND promedio >= 9
            ORDER BY 
                promedio DESC
            LIMIT 5
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