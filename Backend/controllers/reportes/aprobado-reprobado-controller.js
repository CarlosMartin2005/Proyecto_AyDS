import connection from '../../db/connection.js';

export class AprobadoReprobadoController {
    static async getAprobadoReprobado(req, res) {
        const { startDate, endDate } = req.query;
        let dateFilter = '';
        if (startDate && endDate) {
            dateFilter = `AND ac.fecha_matricula BETWEEN '${startDate}' AND '${endDate}'`;
        }
        const consulta = `
            SELECT 
                COUNT(DISTINCT ac.alumno_id) AS totalEstudiantes,
                COUNT(DISTINCT CASE WHEN ac.nota >= 60 THEN ac.alumno_id ELSE NULL END) AS totalAprobados,
                COUNT(DISTINCT CASE WHEN ac.nota < 60 THEN ac.alumno_id ELSE NULL END) AS totalReprobados
            FROM 
                alumnos_cursos ac
            WHERE 
                1=1 ${dateFilter}
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
                    .json(result[0]);
            });
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos " + error
            });
        }
    }
}