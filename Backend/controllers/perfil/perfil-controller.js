import connection from '../../db/connection.js';
import conexion from '../../db/conexion.js';
import 'dotenv/config';

const perfilController = {

    // Obtener perfil de usuario Super
    getPerfil(req, res) {
        const { id, rol } = req.params;
        const query = `SELECT * FROM usuarios WHERE id = ?`;
        const queryAlumnos = `SELECT * FROM alumnos WHERE id_usuario = ?`;
        const queryDocentes = `SELECT * FROM docentes WHERE id_usuario = ?`;
        try {
            connection.query(query, [id], (error, results) => {
                if (error) throw error;
                if (rol === 'Alumno') {
                    connection.query(queryAlumnos, [id], (error, resultsAlumnos) => {
                        if (error) throw error;

                        const resultado = {
                            ...results[0],
                            ...resultsAlumnos[0]
                        }
                        return res.status(200).json({ ...results[0], ...resultsAlumnos[0] });
                    });
                } 
                else if (rol === 'Docente') {
                    connection.query(queryDocentes, [id], (error, resultsDocentes) => {
                        if (error) throw error;
                        return res.status(200).json({ ...results[0], ...resultsDocentes[0] });
                    });
                }
                else{
                return res.status(200).json(results);
                }
            });
            
        } catch (error) {
            return res.status(500).json({
                message: error.message
            });
        }
    }
};