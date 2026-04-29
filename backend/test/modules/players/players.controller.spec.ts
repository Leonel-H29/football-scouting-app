import express from 'express';
import request from 'supertest';
import { PlayersController } from '../../../src/modules/players/infrastructure/controllers/players.controller';
import type { SearchPlayersAction } from '../../../src/modules/players/application/actions/search-players.action';
import type { ComparePlayersAction } from '../../../src/modules/players/application/actions/compare-players.action';
import { createPlayersRouter } from '../../../src/modules/players/infrastructure/router';

describe('PlayersController', () => {
  it('returns search results', async () => {
    const searchPlayersAction: SearchPlayersAction = {
      execute: jest.fn().mockResolvedValue([
        {
          player: {
            id: 'p1',
            name: 'Player 1',
            birthDate: new Date('2000-01-01T00:00:00.000Z'),
            age: 26,
            nationality: 'Argentina',
            position: 'FORWARD',
            photoUrl: 'https://example.com/p1.png',
            currentTeam: {
              id: 't1',
              name: 'Team 1',
              country: 'Argentina',
              logoUrl: 'https://example.com/t1.png',
            },
          },
          latestStat: null,
        },
      ]),
    } as unknown as SearchPlayersAction;

    const comparePlayersAction: ComparePlayersAction = {
      execute: jest.fn(),
    } as unknown as ComparePlayersAction;

    const controller = new PlayersController(
      searchPlayersAction,
      comparePlayersAction
    );
    const app = express();
    app.use(express.json());
    app.use('/api/players', createPlayersRouter(controller));

    const response = await request(app).get('/api/players?name=Player');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(searchPlayersAction.execute).toHaveBeenCalled();
  });
});
