import { PlayerComparisonServiceImpl } from '../../../src/modules/players/application/services/player-comparison.service';
import type { PlayerRepository } from '../../../src/modules/players/domain/repositories/player-repository.interface';
import type { PlayerComparisonCandidate } from '../../../src/modules/players/domain/interfaces/player-comparison-candidate.interface';

describe('PlayerComparisonServiceImpl', () => {
  it('builds a side-by-side comparison from a common season', async () => {
    const repository: PlayerRepository = {
      search: jest.fn(),
      findForComparison: jest.fn().mockResolvedValue([
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
          stats: [
            {
              season: { id: 's1', year: 2024, name: '2024/25' },
              matchesPlayed: 10,
              starts: 9,
              goals: 4,
              assists: 2,
              yellowCards: 1,
              redCards: 0,
              minutesPlayed: 900,
              shots: 20,
              shotsOnTarget: 10,
              keyPasses: 5,
              tackles: 3,
              interceptions: 2,
              dribblesCompleted: 7,
              passAccuracy: 80,
            },
          ],
        },
        {
          player: {
            id: 'p2',
            name: 'Player 2',
            birthDate: new Date('1999-01-01T00:00:00.000Z'),
            age: 27,
            nationality: 'Argentina',
            position: 'MIDFIELDER',
            photoUrl: 'https://example.com/p2.png',
            currentTeam: {
              id: 't2',
              name: 'Team 2',
              country: 'Argentina',
              logoUrl: 'https://example.com/t2.png',
            },
          },
          stats: [
            {
              season: { id: 's1', year: 2024, name: '2024/25' },
              matchesPlayed: 12,
              starts: 12,
              goals: 2,
              assists: 8,
              yellowCards: 2,
              redCards: 0,
              minutesPlayed: 1080,
              shots: 15,
              shotsOnTarget: 6,
              keyPasses: 30,
              tackles: 16,
              interceptions: 9,
              dribblesCompleted: 5,
              passAccuracy: 91,
            },
          ],
        },
      ] as ReadonlyArray<PlayerComparisonCandidate>),
    };

    const service = new PlayerComparisonServiceImpl(repository);
    const result = await service.comparePlayers(['p1', 'p2']);

    expect(result.season?.id).toBe('s1');
    expect(result.players).toHaveLength(2);
    const goalsRow = result.rows.find((row) => row.key === 'goals');
    expect(goalsRow).toBeDefined();
    expect(goalsRow?.values[0]).toBeDefined();
    expect(goalsRow?.values[0]?.value).toBe(4);
  });
});
