import connection from "../../db/connection.js";

export class EstudiantesCursosController {

    static getEstudiantesCursos(req, res) {
        const queryCursos = `SELECT COUNT(*) AS cantidad_alumno, c.id, c.nombre
        FROM Proy_AyDS.alumnos_cursos ac
        JOIN Proy_AyDS.cursos c ON ac.curso_id = c.id
        GROUP BY ac.curso_id, c.nombre;`;

        const queryProgramas = `SELECT COUNT(*) AS cantidad_alumno, c.id, c.nombre
        FROM Proy_AyDS.alumnos_programas ac
        JOIN Proy_AyDS.programas c ON ac.programa_id = c.id
        GROUP BY ac.programa_id;`;

        const queryAlumnos = `SELECT COUNT(*) AS cantidad_alumnos FROM Proy_AyDS.alumnos;`;

        try {
            connection.query(queryCursos, (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    });
                }

                connection.query(queryAlumnos, (error, results2) => {
                    if (error) {
                        return res.status(400).json({
                            error: true,
                            message: "Ocurrió un error al obtener los datos: " + error
                        });
                    }

                    connection.query(queryProgramas, (error, results3) => {
                        if (error) {
                            return res.status(400).json({
                                error: true,
                                message: "Ocurrió un error al obtener los datos: " + error
                            });
                        }

                        const resultados = {
                            cursos: results,
                            alumnos_total: results2[0].cantidad_alumnos,
                            programas: results3
                        }

                        return res
                            .header('Content-Type', 'application/json')
                            .status(200)
                            .json(resultados);
                    })
                })
            });
        }
        catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos " + error
            });
        }


    }
}