import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller.js';

const authRouter = Router();

// Metodos de autentificacion
authRouter.post('/login', AuthController.login);
authRouter.post('/register', AuthController.register);


export default authRouter;