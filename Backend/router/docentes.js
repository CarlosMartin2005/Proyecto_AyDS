import { Router } from 'express';
import { DocentesController } from '../controllers/docentes/docentes-controller.js';
const docentesRouter = Router();

// Metodos de autentificacion
docentesRouter.get('/', DocentesController.getDocentes);
// docentesRouter.post('/add-docente', DocentesController.adddocente);
// docentesRouter.post('/edit-docente', DocentesController.editdocente);
// docentesRouter.delete('/delete-docente', DocentesController.deletedocente);



export default docentesRouter;