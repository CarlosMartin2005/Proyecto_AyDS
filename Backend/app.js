import express, { json } from 'express'
// import { corsMiddleware } from '../Backend/middlewares/cors.js';
import cors from 'cors';
import userRouter from './router/users.js';
import authRouter from './router/auth.js';
import matriculaRouter from './router/matricula.js';
import reportesrouter from './router/reportes.js';
import programaRouter from './router/programas.js';
import 'dotenv/config';
import docentesRouter from './router/docentes.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.disable('x-powered-by')
app.use(json())
app.use(cors({ // Configura el middleware cors directamente aquí
    origin: 'http://localhost:4200', // Permite solicitudes solo desde http://localhost:4200
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/auth', authMiddleware, (req, res) => {
    res.json({ message: 'Acceso concedido', rol: req.rol });
})
app.use('/reportes', reportesrouter);
app.use('/reportes', authMiddleware, reportesrouter);
app.use('/matricula', matriculaRouter);
app.use('/programas', programaRouter);
app.use('/docentes', docentesRouter);

// Middleware para manejo de rutas inexistentes
app.use((req, res) => {
    res.status(404).json({
        message: "URL no encontrada"
    })
})

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en el puerto: http://localhost${PORT}`);
});