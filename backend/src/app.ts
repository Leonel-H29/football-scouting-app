import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { errorHandlerMiddleware } from './common/infrastructure/middlewares/error-handler.middleware';
import { notFoundMiddleware } from './common/infrastructure/middlewares/not-found.middleware';
import { swaggerDocument } from './config/swagger';
import type { PlayersController } from './modules/players/infrastructure/controllers/players.controller';
import type { TeamsController } from './modules/teams/infrastructure/controllers/teams.controller';
import type { SeasonsController } from './modules/seasons/infrastructure/controllers/seasons.controller';
import { createPlayersRouter } from './modules/players/infrastructure/router';
import { createTeamRouter } from './modules/teams/infrastructure/router';
import { createSeasonRouter } from './modules/seasons/infrastructure/router';

export const createApp = (controllers: {
  readonly playersController: PlayersController;
  readonly teamsController: TeamsController;
  readonly seasonsController: SeasonsController;
}): Express => {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  app.get('/health', (_request, response) => {
    response.status(200).json({
      success: true,
      data: {
        status: 'ok',
      },
    });
  });

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use('/api/players', createPlayersRouter(controllers.playersController));
  app.use('/api/teams', createTeamRouter(controllers.teamsController));
  app.use('/api/seasons', createSeasonRouter(controllers.seasonsController));

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
};
