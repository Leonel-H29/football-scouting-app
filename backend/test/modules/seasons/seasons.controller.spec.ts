import express from 'express';
import request from 'supertest';
import { SeasonsController } from '../../../src/modules/seasons/infrastructure/controllers/seasons.controller';
import type { ListSeasonsAction } from '../../../src/modules/seasons/application/actions/list-seasons.action';
import { createSeasonRouter } from '../../../src/modules/seasons/infrastructure/router';

describe('SeasonsController', () => {
  it('returns seasons', async () => {
    const listSeasonsAction: ListSeasonsAction = {
      execute: jest
        .fn()
        .mockResolvedValue([{ id: '1', year: 2024, name: '2024/25' }]),
    } as unknown as ListSeasonsAction;

    const controller = new SeasonsController(listSeasonsAction);
    const app = express();
    app.use(express.json());
    app.use('/api/seasons', createSeasonRouter(controller));

    const response = await request(app).get('/api/seasons');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
