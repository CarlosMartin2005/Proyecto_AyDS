import connection from '../../db/connection.js';

export class AprobadoReprobadoController {
    static async getAprobadoReprobado(req, res) {
        const consulta = `
            SELECT 
                COUNT(*) AS totalEstudiantes,
                SUM(CASE WHEN ac.nota >= 60 THEN 1 ELSE 0 END) AS totalAprobados,
                SUM(CASE WHEN ac.nota < 60 THEN 1 ELSE 0 END) AS totalReprobados,
                SUM(CASE WHEN ac.nota >= 90 THEN 1 ELSE 0 END) AS totalExcelencia
            FROM 
                alumnos_cursos ac
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