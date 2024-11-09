import { Router } from 'express';
import { UserController } from '../controllers/user-controller.js';

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);

userRouter.get('/:id', UserController.getUserporId);

userRouter.post('/', UserController.createUser);

userRouter.put('/:id', UserController.updateUser);

userRouter.delete('/:id', UserController.deleteUser);

export default userRouter;