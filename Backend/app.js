import express, { json } from 'express'
import { corsMiddleware } from '../Backend/middlewares/cors.js';
import userRouter from './router/users.js';
// import dotenv from 'dotenv';
// import connection from './db/connection.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/users', userRouter);

app.listen(3000, () => {
    console.log(`El servidor está corriendo en el puerto: http://localhost${PORT}`);
});