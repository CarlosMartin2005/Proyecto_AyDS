import { Router } from 'express';
import { DocentesController } from '../controllers/docentes/docentes-controller.js';
const docentesRouter = Router();

// Metodos de autentificacion
docentesRouter.get('/', DocentesController.getDocentes);
docentesRouter.post('/add-docente', DocentesController.addDocente);
docentesRouter.post('/edit-docente', DocentesController.editDocente);
docentesRouter.delete('/delete-docente', DocentesController.deleteDocente);



export default docentesRouter;