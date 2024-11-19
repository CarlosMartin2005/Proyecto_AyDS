import connection from '../db/connection.js';
import bcrypt from "bcrypt";
import 'dotenv/config';
import { validateRegister } from '../schemas/auth.schema.js';
import crypto from 'node:crypto';
import jwt from "jsonwebtoken";

export class AuthController {
    static login(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Usuario y contraseña son requeridos!"
            })
        }

        const query = `SELECT id, email, password_hash, role, status 
                        FROM accounts WHERE email = ? `

        try {
            connection.query(query, [email], (error, results) => {

                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al obtener los dato: " + error
                    })
                }

                if (results && results.length === 0) {
                    return res.status(404).json({
                        error: true,
                        message: "Usuario no encontrado"
                    })
                }

                const { id, email, password_hash, role, status } = results[0] // extraigo los datos necesarios

                bcrypt.compare(password, password_hash, function (err, result) {
                    if (!result) {
                        return res.status(400).json({
                            error: true,
                            message: "Ocurrió un error al comparar las contraseñas"
                        })
                    }

                    const token = jwt.sign({ id, email, role, status }, process.env.JWT_SECRET, { expiresIn: '1h' });

                    return res.status(200).json({
                        error: false,
                        message: "Bienvenido",
                        token: token,
                        duration: 3600
                    })

                });
            })
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })
        }
    }

    static register(req, res) {
        const data = req.body;
        const { success, error } = validateRegister(data);
        const queryCheckEmail = `SELECT email FROM accounts WHERE email = ?`;
        const queryInsert = `INSERT INTO accounts (id, email, firstName, lastName, username, password_hash, must_change_password, role, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        if (!success) {
            res.status(400).json({
                message: JSON.parse(error.message)
            })
        }

        try {
            const { 
                email, 
                password, 
                firstName,
                lastName,
                username,
                must_change_password,
                role, 
                status 
            } = data;
            const id = crypto.randomUUID()
            const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const password_hash = bcrypt.hashSync(password, 10)

            // consulta para verificar si el correo ya está registrado
            connection.query(queryCheckEmail, [email], (error, results) => {
                if (error) {
                    return res.status(400).json({
                        error: true,
                        message: "Ocurrió un error al verificar el correo: " + error
                    });
                }

                if (results && results.length > 0) {
                    return res.status(400).json({
                        error: true,
                        message: "El correo ya está registrado"
                    });
                }

                // consulta para insertar el usuario
                connection.query(queryInsert, [id, email, firstName, lastName, username, password_hash, must_change_password ?? 1, role ?? 'alumno', status ?? 'inactivo', created_at, created_at], (error, results) => {
                    if (error) {
                        return res.status(400).json({
                            error: true,
                            message: "Ocurrió un error al registrar el usuario: " + error
                        });
                    }
                    return res.status(201).json({
                        error: false,
                        message: "Usuario registrado exitosamente"
                    });
                });
            });
        } catch (error) {
            return res.status(400).json({
                error: true,
                message: "Ocurrió un error al obtener los datos"
            })
        }
    }

    static logout(req, res) {
    }
}