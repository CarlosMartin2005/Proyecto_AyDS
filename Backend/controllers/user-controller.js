import connection from '../db/connection.js';
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

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
        const consulta = `SELECT * FROM usuarios WHERE id = ?`;
        try {
            connection.query(consulta, [id], (error, result) => {

                if(!id) {
                    return res.status(400).json({
                        error: true,
                        message: "El id es requerido"
                    })
                }
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
        const { id, nombre, apellido, email, username, password, rol } = req.body;
        const saltRounds = 10;
        const queryCheckEmail = `SELECT email FROM accounts WHERE email = ?`;
        const consulta = `INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol) VALUES (?, ?, ?, ?, ?, ?, ?)`;


        if (!id || !nombre || !apellido || !email || !username || !password || !rol) {
            return res.status(400).json({
                error: true,
                message: "Todos los campos son obligatorios"
            });
        }

        try {
            const id = uuidv4();
            const password_hash = await bcrypt.hash(password, saltRounds);

            const consulta = `INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            connection.query(consulta, [id, nombre, apellido, email, username, password_hash, rol], (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al crear el usuario: " + error
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
                message: "Ocurrió un error al crear el usuario: " + error
            });
        }
    }

    static async updateUser(req, res) {
        const { id } = req.params;
        const { nombre, apellido, email, username, password, rol } = req.body;
        const saltRounds = 10;

        if (!id || !nombre || !apellido || !email || !username || !rol) {
            return res.status(400).json({
                error: true,
                message: "Todos los campos son obligatorios"
            });
        }

        try {
            let password_hash = null;
            if (password) {
                password_hash = await bcrypt.hash(password, saltRounds);
            }

            const consulta = `UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, username = ?, password_hash = ?, rol = ? WHERE id = ?`;
            connection.query(consulta, [nombre, apellido, email, username, password_hash, rol, id], (error, result) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al actualizar el usuario: " + error
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
                message: "Ocurrió un error al actualizar el usuario: " + error
            });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        const consulta = `DELETE FROM usuarios WHERE id = ?`;
        try {
            connection.query(consulta, [id], (error, result) => {
                
                if (!id) {
                    return res.status(400).json({
                        error: true,
                        message: "El id es requerido"
                    })
                }
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