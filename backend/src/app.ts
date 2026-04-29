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
import type { AuthController } from './modules/auth/infrastructure/controllers/auth.controller';
import { createPlayersRouter } from './modules/players/infrastructure/router';
import { createTeamRouter } from './modules/teams/infrastructure/router';
import { createSeasonRouter } from './modules/seasons/infrastructure/router';
import { createAuthRouter } from './modules/auth/infrastructure/routes';
import { authenticateJwtMiddleware } from './modules/auth/infrastructure/middlewares/authenticate-jwt.middleware';
import type { JwtTokenService } from './modules/auth/application/services/jwt-token.service';

export const createApp = (controllers: {
  readonly playersController: PlayersController;
  readonly teamsController: TeamsController;
  readonly seasonsController: SeasonsController;
  readonly authController: AuthController;
  readonly jwtTokenService: JwtTokenService;
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
  app.use('/api/auth', createAuthRouter(controllers.authController));

  app.use(authenticateJwtMiddleware(controllers.jwtTokenService));
  app.use('/api/players', createPlayersRouter(controllers.playersController));
  app.use('/api/teams', createTeamRouter(controllers.teamsController));
  app.use('/api/seasons', createSeasonRouter(controllers.seasonsController));

  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);

  return app;
};
