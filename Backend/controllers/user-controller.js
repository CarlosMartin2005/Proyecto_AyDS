import connection from '../db/connection.js';

export class UserController {

    static async getAllUsers(req, res) {
        const consulta = 'SELECT * FROM usuarios';
        try {
            connection.query(consulta, (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    })
                }
                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(result)
            })
            
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })
        }
    }

    static async getUserporId(req, res) {
        const { id } = req.params;
        const consulta = `SELECT * FROM usuarios WHERE id = ${id}`;
        try {
            connection.query(consulta, (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los datos: " + error
                    })
                }
                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(result[0])
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })
        }
    }

    static async createUser(req, res) {
        const { nombre, lugar_nacimiento, fecha_nacimiento, direccion, identidad, telefono, institucion_procedencia, correo, contraseña, instrumento, programa_id, curso_id } = req.body;
        const consulta = `INSERT INTO usuarios (nombre, lugar_nacimiento, fecha_nacimiento, direccion, identidad, telefono, institucion_procedencia, correo, contraseña, instrumento, programa_id, curso_id) VALUES ('${nombre}', '${lugar_nacimiento}', '${fecha_nacimiento}', '${direccion}', '${identidad}', '${telefono}', '${institucion_procedencia}', '${correo}', '${contraseña}', '${instrumento}', '${programa_id}', '${curso_id}')`;
        try {
            connection.query(consulta, (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al crear el usuario: " + error
                    })
                }
                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(result)
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al crear el usuario"
            })
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { nombre, lugar_nacimiento, fecha_nacimiento, direccion, identidad, telefono, institucion_procedencia, correo, contraseña, instrumento, programa_id, curso_id } = req.body;
        const consulta = `UPDATE usuarios SET nombre = '${nombre}', lugar_nacimiento = '${lugar_nacimiento}', fecha_nacimiento = '${fecha_nacimiento}', direccion = '${direccion}', identidad = '${identidad}', telefono = '${telefono}', institucion_procedencia = '${institucion_procedencia}', correo = '${correo}', contraseña = '${contraseña}', instrumento = '${instrumento}', programa_id = '${programa_id}', curso_id = '${curso_id}' WHERE id = ${id}`;
        try {
            connection.query(consulta, (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al actualizar el usuario: " + error
                    })
                }
                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(result)
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al actualizar el usuario"
            })
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        const consulta = `DELETE FROM usuarios WHERE id = ${id}`;
        try {
            connection.query(consulta, (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al eliminar el usuario: " + error
                    })
                }
                return res
                    .header('Content-Type', 'application/json')
                    .status(200)
                    .json(result)
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al eliminar el usuario"
            })
        }
    }
}