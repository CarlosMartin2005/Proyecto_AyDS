import { Router } from 'express';
import { DocentesController } from '../controllers/docentes-controller.js';
import { EstudianteController } from '../controllers/estudiante-controller.js';
import { ProgramasCursosController } from '../controllers/programas-cursos-controller.js';

const reportesrouter = Router();

reportesrouter.get('/docentes', DocentesController.getAllDocentes);
reportesrouter.get('/estudiantes', EstudianteController.getAllEstudiantes);
reportesrouter.get('/programas-cursos', ProgramasCursosController.getAllProgramasCursos);

export default reportesrouter;