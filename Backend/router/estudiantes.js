import { Router } from 'express';
import { EstudianteController } from '../controllers/estudiantes/estudiantes-controller.js';
const estudiantesRouter = Router();

// Metodos de autentificacion
estudiantesRouter.get('/', EstudianteController.getEstudiantes);
estudiantesRouter.post('/edit-estudiante', EstudianteController.editEstudiante);
estudiantesRouter.post('/edit-matricula', EstudianteController.editMatricula);
estudiantesRouter.delete('/delete-estudiante', EstudianteController.deleteEstudiante);



export default estudiantesRouter;