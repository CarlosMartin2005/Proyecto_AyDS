import { Router } from 'express';
import { DocentesController } from '../controllers/docentes-controller.js';

const reportesrouter = Router();

reportesrouter.get('/docentes', DocentesController.getAllDocentes);

export default reportesrouter;