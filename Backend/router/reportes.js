import { Router } from 'express';
import { DocentesController } from '../controllers/docentes-controller.js';
import { EstudianteController } from '../controllers/estudiante-controller.js';

const reportesrouter = Router();

reportesrouter.get('/docentes', DocentesController.getAllDocentes);
reportesrouter.get('/estudiantes', EstudianteController.getAllEstudiantes);

export default reportesrouter;