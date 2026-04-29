import { Router } from 'express';
import type { PlayersController } from './controllers/players.controller';

export const createPlayersRouter = (
  playersController: PlayersController
): Router => {
  const router = Router();

  router.get('/', playersController.searchPlayers.bind(playersController));
  router.post(
    '/compare',
    playersController.comparePlayers.bind(playersController)
  );

  return router;
};
