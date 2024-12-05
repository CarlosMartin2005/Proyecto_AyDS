import { Router } from 'express';
import { getProgramasController } from '../controllers/matricula/get-programas-controller.js';
import { RegisterAlumnoController } from '../controllers/matricula/register-alumno-controller.js';

const matriculaRouter = Router();

// Metodos de autentificacion
matriculaRouter.get('/programas', getProgramasController.getInfo);
matriculaRouter.post('/register', RegisterAlumnoController.registerAlumno);


export default matriculaRouter;