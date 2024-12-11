import connection from "../../db/connection.js";

export class RendimientoEstudianteController {
    static getRendimiento(req, res) {
        const id = req.params.id;
        const { startDate, endDate } = req.query;
        let dateFilter = '';
        if (startDate && endDate) {
            dateFilter = `AND r.fecha BETWEEN '${startDate}' AND '${endDate}'`;
        }
        console.log(dateFilter);

        const query = `
        SELECT 
            u.nombre,
            u.apellido,
            u.email,
            a.fecha_nacimiento,
            a.identidad,
            AVG(r.rendimiento_academico) AS promedio_rendimiento_academico,
            AVG(r.manejo_instrumentos) AS promedio_manejo_instrumentos,
            AVG(r.interpretacion) AS promedio_interpretacion,
            AVG(r.creatividad) AS promedio_creatividad,
            AVG(r.trabajo_equipo) AS promedio_trabajo_equipo
        FROM 
            Proy_AyDS.usuarios u 
        JOIN 
            Proy_AyDS.alumnos a ON u.id = a.id_usuario 
        JOIN 
            Proy_AyDS.rendimiento_estudiante r ON u.id = r.id_usuario 
        WHERE 
            u.id = ? ${dateFilter}
        GROUP BY 
            u.nombre, u.apellido, u.email, a.fecha_nacimiento, a.identidad;`;

        try {
            connection.query(query, [id], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    });
                }

                if (results && results.length === 0) {
                    return res.status(404).json({
                        error: true,
                        message: "Alumno no encontrado",
                        results: results
                    });
                }

                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(results[0]);
            });
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos " + error
            });
        }
    }
}