import express from 'express';
import request from 'supertest';
import { TeamsController } from '../../../src/modules/teams/infrastructure/controllers/teams.controller';
import type { ListTeamsAction } from '../../../src/modules/teams/application/actions/list-teams.action';
import { createTeamRouter } from '../../../src/modules/teams/infrastructure/router';

describe('TeamsController', () => {
  it('returns teams', async () => {
    const listTeamsAction: ListTeamsAction = {
      execute: jest
        .fn()
        .mockResolvedValue([
          {
            id: '1',
            name: 'River Plate',
            country: 'Argentina',
            logoUrl: 'logo',
          },
        ]),
    } as unknown as ListTeamsAction;

    const controller = new TeamsController(listTeamsAction);
    const app = express();
    app.use(express.json());
    app.use('/api/teams', createTeamRouter(controller));

    const response = await request(app).get('/api/teams');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
