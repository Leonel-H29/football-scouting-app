import { describe, expect, it } from 'vitest';
import { filterPlayers } from '@/shared/utils/player-filters';
import { PlayerListItem } from '@/shared/types/domain';

const items: PlayerListItem[] = [
  {
    player: {
      id: '1',
      name: 'Lionel Messi',
      birthDate: '1987-06-24T00:00:00.000Z',
      age: 37,
      nationality: 'Argentina',
      position: 'FORWARD',
      photoUrl: '',
      currentTeam: { id: 'team-1', name: 'Inter Miami', country: 'USA', logoUrl: '' },
    },
    latestStat: null,
  },
  {
    player: {
      id: '2',
      name: 'Emiliano Martínez',
      birthDate: '1992-09-02T00:00:00.000Z',
      age: 32,
      nationality: 'Argentina',
      position: 'GOALKEEPER',
      photoUrl: '',
      currentTeam: { id: 'team-2', name: 'Aston Villa', country: 'England', logoUrl: '' },
    },
    latestStat: null,
  },
];

describe('filterPlayers', () => {
  it('filters by name, position and age range', () => {
    const filtered = filterPlayers(items, { name: 'messi', position: 'FORWARD', nationality: '', minAge: 30, maxAge: 40 });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].player.name).toBe('Lionel Messi');
  });

  it('returns empty results when the filters do not match', () => {
    const filtered = filterPlayers(items, { name: 'x', position: 'ALL', nationality: '', minAge: undefined, maxAge: undefined });
    expect(filtered).toHaveLength(0);
  });
});
