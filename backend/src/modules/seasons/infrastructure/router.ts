import { Router } from 'express';
import type { SeasonsController } from './controllers/seasons.controller';

export const createSeasonRouter = (seasonController: SeasonsController) => {
  const router = Router();
  router.get('/', seasonController.listSeasons.bind(seasonController));
  return router;
};
