import { Router } from 'express';
import type { UsersController } from '../infrastructure/controllers/users.controller';

export const createUserRouter = (usersController: UsersController): Router => {
  const router = Router();

  router.get('/by-email', usersController.findByEmail.bind(usersController));
  router.get('/password/by-email', usersController.findPasswordByEmail.bind(usersController));
  router.get('/:id', usersController.findById.bind(usersController));
  router.put('/:id', usersController.update.bind(usersController));

  return router;
};
