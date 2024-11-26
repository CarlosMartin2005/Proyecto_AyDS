import connection from '../db/connection.js';
import bcrypt from "bcrypt";
import 'dotenv/config';
import { validateRegister } from '../schemas/auth.schema.js';
import crypto from 'node:crypto';
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

export class AuthController {
    static login(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                message: "Usuario y contraseña son requeridos!"
            })
        }

        const query = `SELECT id, email, password_hash, rol, status, nombre, apellido 
                        FROM usuarios WHERE email = ? `

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

                const { id, email, password_hash, rol, status, nombre, apellido } = results[0] // extraigo los datos necesarios

                bcrypt.compare(password, password_hash, function (err, result) {
                    if (!result) {
                        return res.status(401).json({
                            error: true,
                            message: "Usuario o contraseña incorrectos"
                        })
                    }

                    const data = { id, email, rol, status, nombre, apellido };

                    const token = jwt.sign({ id, email, rol, status }, process.env.JWT_SECRET, { expiresIn: '1h' });

                    return res.status(200).json({
                        error: false,
                        message: "Bienvenido",
                        data: data,
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

    static async register(req, res) {
        const data = req.body;

        const { nombre, apellido, email, username, password, rol, status } = req.body;
        const { success, error } = validateRegister(data);
        const queryCheckEmail = `SELECT email FROM usuarios WHERE email = ?`;
        const consulta = `INSERT INTO usuarios (id, nombre, apellido, email, username, password_hash, rol, status, fecha_creacion, fecha_actualizacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;


        if (!success) {
            res.status(400).json({
                message: JSON.parse(error.message)
            })
        }

        try {
            const id = uuidv4();
            const password_hash = await bcrypt.hash(password, 10);
            // const id = crypto.randomUUID()
            const fecha_creacion = new Date().toISOString().slice(0, 19).replace('T', ' ');

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

                // si el rol es Super, status debe ser A sino será I
                // const status = rol === 'Super' ? 'A' : 'I';

                // consulta para insertar el usuario
                connection.query(consulta, [id, nombre, apellido, email,  username, password_hash, rol ?? 'Alumno', status ?? 'I', fecha_creacion, fecha_creacion], (error, results) => {
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