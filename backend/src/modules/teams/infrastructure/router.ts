import { Router } from 'express';
import type { TeamsController } from './controllers/teams.controller';

export const createTeamRouter = (teamController: TeamsController): Router => {
  const router = Router();

  router.get('/', teamController.listTeams.bind(teamController));

  return router;
};
