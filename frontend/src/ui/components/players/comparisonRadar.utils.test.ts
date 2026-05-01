import { describe, expect, it } from 'vitest';
import { buildComparisonRadarData } from '@/ui/components/players/comparisonRadar.utils';
import { CompareResult } from '@/shared/types/domain';

const compareResult: CompareResult = {
  season: {
    id: 'season-1',
    year: 2024,
    name: '2024/25',
  },
  players: [
    {
      id: 'player-1',
      name: 'Player One',
      birthDate: '2000-01-01T00:00:00.000Z',
      age: 25,
      nationality: 'Argentina',
      position: 'FORWARD',
      photoUrl: null,
      currentTeam: { id: 'team-1', name: 'Team A', country: 'Argentina', logoUrl: '' },
    },
    {
      id: 'player-2',
      name: 'Player Two',
      birthDate: '2001-01-01T00:00:00.000Z',
      age: 24,
      nationality: 'Brazil',
      position: 'MIDFIELDER',
      photoUrl: null,
      currentTeam: { id: 'team-2', name: 'Team B', country: 'Brazil', logoUrl: '' },
    },
  ],
  rows: [
    {
      key: 'goals',
      label: 'Goals',
      values: [
        { playerId: 'player-1', playerName: 'Player One', value: 10 },
        { playerId: 'player-2', playerName: 'Player Two', value: 5 },
      ],
    },
    {
      key: 'assists',
      label: 'Assists',
      values: [
        { playerId: 'player-1', playerName: 'Player One', value: 2 },
        { playerId: 'player-2', playerName: 'Player Two', value: 2 },
      ],
    },
  ],
};

describe('buildComparisonRadarData', () => {
  it('builds a multi-dataset radar chart with normalized values', () => {
    const { chartData, series } = buildComparisonRadarData(compareResult);

    expect(series).toHaveLength(2);
    expect(chartData).toHaveLength(2);
    expect(chartData[0].metric).toBe('Goals');
    expect(chartData[0]['player-1']).toBe(100);
    expect(chartData[0]['player-2']).toBe(50);
    expect(chartData[1]['player-1']).toBe(100);
    expect(chartData[1]['player-2']).toBe(100);
  });
});
