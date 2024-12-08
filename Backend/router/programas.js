import { Router } from 'express';
import { ProgramasController } from '../controllers/programas/programas-controller.js';

const programaRouter = Router();

// Metodos de autentificacion
programaRouter.get('/', ProgramasController.getInfo);
programaRouter.post('/add-programa', ProgramasController.addPrograma);
programaRouter.post('/add-curso', ProgramasController.addCurso);
programaRouter.post('/edit-programa', ProgramasController.editPrograma);
programaRouter.post('/edit-curso', ProgramasController.editCurso);
programaRouter.delete('/delete-programa', ProgramasController.deletePrograma);
programaRouter.delete('/delete-curso', ProgramasController.deleteCurso);



export default programaRouter;