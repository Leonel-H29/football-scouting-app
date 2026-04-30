import { PlayerListItem, Position, Season, Team } from '@/shared/types/domain';

const season2026: Season = { id: 'season-2026', year: 2026, name: '2026' };
const season2025: Season = { id: 'season-2025', year: 2025, name: '2025' };

const boca: Team = { id: 'team-boca', name: 'CA Boca Juniors', country: 'Argentina', logoUrl: 'https://resources.premierleague.com/premierleague/badges/50/t7.png' };
const river: Team = { id: 'team-river', name: 'CA River Plate', country: 'Argentina', logoUrl: 'https://resources.premierleague.com/premierleague/badges/50/t8.png' };
const racing: Team = { id: 'team-racing', name: 'Racing Club', country: 'Argentina', logoUrl: 'https://resources.premierleague.com/premierleague/badges/50/t9.png' };
const sanLorenzo: Team = { id: 'team-sanlorenzo', name: 'San Lorenzo', country: 'Argentina', logoUrl: 'https://resources.premierleague.com/premierleague/badges/50/t10.png' };

const stat = (season: Season, values: {
  matchesPlayed: number;
  starts: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  shots: number;
  shotsOnTarget: number;
  keyPasses: number;
  tackles: number;
  interceptions: number;
  dribblesCompleted: number;
  passAccuracy: number;
}) => ({ season, ...values });

export const playerFixtures: PlayerListItem[] = [
  {
    player: {
      id: 'player-merentiel',
      name: 'Miguel Ángel Merentiel Serrano',
      birthDate: '1995-05-24T00:00:00.000Z',
      age: 30,
      nationality: 'Uruguay',
      position: 'FORWARD' as Position,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/480px-Portrait_Placeholder.png',
      currentTeam: boca,
    },
    latestStat: stat(season2026, {
      matchesPlayed: 13,
      starts: 11,
      goals: 4,
      assists: 2,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 754,
      shots: 31,
      shotsOnTarget: 13,
      keyPasses: 16,
      tackles: 7,
      interceptions: 3,
      dribblesCompleted: 18,
      passAccuracy: 76.3,
    }),
  },
  {
    player: {
      id: 'player-colidio',
      name: 'Facundo Colidio',
      birthDate: '2000-01-04T00:00:00.000Z',
      age: 26,
      nationality: 'Argentina',
      position: 'FORWARD' as Position,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/480px-Portrait_Placeholder.png',
      currentTeam: river,
    },
    latestStat: stat(season2026, {
      matchesPlayed: 13,
      starts: 10,
      goals: 2,
      assists: 3,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 534,
      shots: 24,
      shotsOnTarget: 10,
      keyPasses: 14,
      tackles: 5,
      interceptions: 2,
      dribblesCompleted: 12,
      passAccuracy: 73.3,
    }),
  },
  {
    player: {
      id: 'player-luciano',
      name: 'Luciano Vera',
      birthDate: '1999-04-11T00:00:00.000Z',
      age: 27,
      nationality: 'Argentina',
      position: 'MIDFIELDER' as Position,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/480px-Portrait_Placeholder.png',
      currentTeam: racing,
    },
    latestStat: stat(season2026, {
      matchesPlayed: 14,
      starts: 13,
      goals: 1,
      assists: 5,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 1091,
      shots: 18,
      shotsOnTarget: 7,
      keyPasses: 28,
      tackles: 32,
      interceptions: 19,
      dribblesCompleted: 21,
      passAccuracy: 86.5,
    }),
  },
  {
    player: {
      id: 'player-nacho',
      name: 'Ignacio Ferreira',
      birthDate: '1998-12-13T00:00:00.000Z',
      age: 27,
      nationality: 'Uruguay',
      position: 'DEFENDER' as Position,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/480px-Portrait_Placeholder.png',
      currentTeam: sanLorenzo,
    },
    latestStat: stat(season2026, {
      matchesPlayed: 12,
      starts: 12,
      goals: 0,
      assists: 1,
      yellowCards: 4,
      redCards: 0,
      minutesPlayed: 1080,
      shots: 4,
      shotsOnTarget: 1,
      keyPasses: 6,
      tackles: 41,
      interceptions: 25,
      dribblesCompleted: 3,
      passAccuracy: 88.1,
    }),
  },
  {
    player: {
      id: 'player-pedro',
      name: 'Pedro Alarcón',
      birthDate: '2001-09-01T00:00:00.000Z',
      age: 24,
      nationality: 'Chile',
      position: 'GOALKEEPER' as Position,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/480px-Portrait_Placeholder.png',
      currentTeam: river,
    },
    latestStat: stat(season2025, {
      matchesPlayed: 11,
      starts: 11,
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 990,
      shots: 0,
      shotsOnTarget: 0,
      keyPasses: 0,
      tackles: 1,
      interceptions: 2,
      dribblesCompleted: 0,
      passAccuracy: 84.0,
    }),
  },
  {
    player: {
      id: 'player-julian',
      name: 'Julián Romero',
      birthDate: '2003-08-20T00:00:00.000Z',
      age: 22,
      nationality: 'Argentina',
      position: 'MIDFIELDER' as Position,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/480px-Portrait_Placeholder.png',
      currentTeam: boca,
    },
    latestStat: stat(season2026, {
      matchesPlayed: 10,
      starts: 8,
      goals: 3,
      assists: 4,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 701,
      shots: 20,
      shotsOnTarget: 8,
      keyPasses: 26,
      tackles: 18,
      interceptions: 11,
      dribblesCompleted: 20,
      passAccuracy: 82.4,
    }),
  },
  {
    player: {
      id: 'player-hugo',
      name: 'Hugo Benítez',
      birthDate: '1996-10-09T00:00:00.000Z',
      age: 29,
      nationality: 'Paraguay',
      position: 'DEFENDER' as Position,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/480px-Portrait_Placeholder.png',
      currentTeam: sanLorenzo,
    },
    latestStat: stat(season2026, {
      matchesPlayed: 15,
      starts: 15,
      goals: 1,
      assists: 0,
      yellowCards: 5,
      redCards: 1,
      minutesPlayed: 1320,
      shots: 7,
      shotsOnTarget: 2,
      keyPasses: 4,
      tackles: 48,
      interceptions: 31,
      dribblesCompleted: 2,
      passAccuracy: 90.2,
    }),
  },
  {
    player: {
      id: 'player-alejo',
      name: 'Alejo Torres',
      birthDate: '2002-02-17T00:00:00.000Z',
      age: 24,
      nationality: 'Argentina',
      position: 'FORWARD' as Position,
      photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Portrait_Placeholder.png/480px-Portrait_Placeholder.png',
      currentTeam: racing,
    },
    latestStat: stat(season2026, {
      matchesPlayed: 14,
      starts: 7,
      goals: 5,
      assists: 1,
      yellowCards: 0,
      redCards: 0,
      minutesPlayed: 620,
      shots: 29,
      shotsOnTarget: 14,
      keyPasses: 9,
      tackles: 4,
      interceptions: 2,
      dribblesCompleted: 16,
      passAccuracy: 75.1,
    }),
  },
];

export const seasonFixtures: Season[] = [season2026, season2025];
export const teamFixtures: Team[] = [boca, river, racing, sanLorenzo];
