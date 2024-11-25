import { Router } from 'express';
import { DocentesController } from '../controllers/docentes-controller.js';
import { EstudianteController } from '../controllers/estudiante-controller.js';
import { ProgramasCursosController } from '../controllers/programas-cursos-controller.js';
import { EstudiantesCursosController } from '../controllers/reportes/estudiantes-cursos-controller.js';
import { SeguimientoController } from '../controllers/reportes/seguimiento-controller.js';
import { MatriculaController } from '../controllers/reportes/matricula-controller.js';
import { RendimientoEstudianteController } from '../controllers/reportes/rendimiento-estudiante-controller.js';

const reportesrouter = Router();

reportesrouter.get('/docentes', DocentesController.getAllDocentes);
reportesrouter.get('/estudiantes', EstudianteController.getAllEstudiantes);
reportesrouter.get('/programas-cursos', ProgramasCursosController.getAllProgramasCursos);
reportesrouter.get('/seguimiento', SeguimientoController.getAllSeguimiento);
reportesrouter.get('/estudiantes-cursos', EstudiantesCursosController.getEstudiantesCursos);
reportesrouter.get('/rendimiento-estudiante/:id', RendimientoEstudianteController.getRendimiento);

export default reportesrouter;