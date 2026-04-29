import { PrismaClient, Position } from '@prisma/client';

const prisma = new PrismaClient();

const teams = [
  {
    name: 'River Plate',
    country: 'Argentina',
    logoUrl: 'https://cdn.example.com/logos/river-plate.png'
  },
  {
    name: 'Boca Juniors',
    country: 'Argentina',
    logoUrl: 'https://cdn.example.com/logos/boca-juniors.png'
  },
  {
    name: 'Manchester City',
    country: 'England',
    logoUrl: 'https://cdn.example.com/logos/manchester-city.png'
  }
];

const seasons = [
  { year: 2023, name: '2023/24' },
  { year: 2024, name: '2024/25' }
];

type SeedPlayer = {
  name: string;
  birthDate: string;
  nationality: string;
  position: Position;
  photoUrl: string;
  currentTeamName: string;
  stats: Array<{
    seasonYear: number;
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
  }>;
};

const players: ReadonlyArray<SeedPlayer> = [
  {
    name: 'Enzo Fernández',
    birthDate: '2001-01-17T00:00:00.000Z',
    nationality: 'Argentina',
    position: Position.MIDFIELDER,
    photoUrl: 'https://cdn.example.com/players/enzo-fernandez.png',
    currentTeamName: 'Manchester City',
    stats: [
      { seasonYear: 2023, matchesPlayed: 37, starts: 34, goals: 6, assists: 9, yellowCards: 7, redCards: 0, minutesPlayed: 2910, shots: 45, shotsOnTarget: 18, keyPasses: 58, tackles: 89, interceptions: 54, dribblesCompleted: 32, passAccuracy: 88.4 },
      { seasonYear: 2024, matchesPlayed: 41, starts: 39, goals: 7, assists: 11, yellowCards: 6, redCards: 0, minutesPlayed: 3290, shots: 52, shotsOnTarget: 20, keyPasses: 66, tackles: 95, interceptions: 61, dribblesCompleted: 35, passAccuracy: 89.1 }
    ]
  },
  {
    name: 'Lautaro Martínez',
    birthDate: '1997-08-22T00:00:00.000Z',
    nationality: 'Argentina',
    position: Position.FORWARD,
    photoUrl: 'https://cdn.example.com/players/lautaro-martinez.png',
    currentTeamName: 'Boca Juniors',
    stats: [
      { seasonYear: 2023, matchesPlayed: 39, starts: 38, goals: 24, assists: 7, yellowCards: 4, redCards: 0, minutesPlayed: 3125, shots: 116, shotsOnTarget: 53, keyPasses: 34, tackles: 15, interceptions: 8, dribblesCompleted: 49, passAccuracy: 80.3 },
      { seasonYear: 2024, matchesPlayed: 42, starts: 41, goals: 27, assists: 8, yellowCards: 5, redCards: 0, minutesPlayed: 3360, shots: 128, shotsOnTarget: 58, keyPasses: 38, tackles: 18, interceptions: 10, dribblesCompleted: 53, passAccuracy: 81.0 }
    ]
  },
  {
    name: 'Julian Álvarez',
    birthDate: '2000-01-31T00:00:00.000Z',
    nationality: 'Argentina',
    position: Position.FORWARD,
    photoUrl: 'https://cdn.example.com/players/julian-alvarez.png',
    currentTeamName: 'Manchester City',
    stats: [
      { seasonYear: 2023, matchesPlayed: 38, starts: 28, goals: 19, assists: 10, yellowCards: 3, redCards: 0, minutesPlayed: 2510, shots: 92, shotsOnTarget: 41, keyPasses: 43, tackles: 18, interceptions: 12, dribblesCompleted: 41, passAccuracy: 84.1 },
      { seasonYear: 2024, matchesPlayed: 40, starts: 31, goals: 21, assists: 12, yellowCards: 2, redCards: 0, minutesPlayed: 2784, shots: 98, shotsOnTarget: 44, keyPasses: 47, tackles: 21, interceptions: 13, dribblesCompleted: 46, passAccuracy: 84.8 }
    ]
  },
  {
    name: 'Cristian Romero',
    birthDate: '1998-04-27T00:00:00.000Z',
    nationality: 'Argentina',
    position: Position.DEFENDER,
    photoUrl: 'https://cdn.example.com/players/cristian-romero.png',
    currentTeamName: 'Manchester City',
    stats: [
      { seasonYear: 2023, matchesPlayed: 36, starts: 36, goals: 3, assists: 1, yellowCards: 9, redCards: 1, minutesPlayed: 3180, shots: 23, shotsOnTarget: 9, keyPasses: 11, tackles: 96, interceptions: 74, dribblesCompleted: 8, passAccuracy: 87.2 },
      { seasonYear: 2024, matchesPlayed: 39, starts: 39, goals: 4, assists: 2, yellowCards: 8, redCards: 0, minutesPlayed: 3450, shots: 25, shotsOnTarget: 10, keyPasses: 13, tackles: 104, interceptions: 79, dribblesCompleted: 10, passAccuracy: 87.9 }
    ]
  },
  {
    name: 'Kevin De Bruyne',
    birthDate: '1991-06-28T00:00:00.000Z',
    nationality: 'Belgium',
    position: Position.MIDFIELDER,
    photoUrl: 'https://cdn.example.com/players/kevin-de-bruyne.png',
    currentTeamName: 'Manchester City',
    stats: [
      { seasonYear: 2023, matchesPlayed: 31, starts: 28, goals: 9, assists: 17, yellowCards: 2, redCards: 0, minutesPlayed: 2440, shots: 58, shotsOnTarget: 21, keyPasses: 92, tackles: 31, interceptions: 20, dribblesCompleted: 19, passAccuracy: 89.7 },
      { seasonYear: 2024, matchesPlayed: 34, starts: 31, goals: 10, assists: 15, yellowCards: 2, redCards: 0, minutesPlayed: 2620, shots: 61, shotsOnTarget: 24, keyPasses: 88, tackles: 28, interceptions: 18, dribblesCompleted: 17, passAccuracy: 90.1 }
    ]
  }
];

async function main(): Promise<void> {
  await prisma.playerStats.deleteMany();
  await prisma.player.deleteMany();
  await prisma.season.deleteMany();
  await prisma.team.deleteMany();

  const createdTeams = new Map<string, string>();

  for (const team of teams) {
    const created = await prisma.team.create({ data: team });
    createdTeams.set(created.name, created.id);
  }

  const createdSeasons = new Map<number, string>();

  for (const season of seasons) {
    const created = await prisma.season.create({ data: season });
    createdSeasons.set(created.year, created.id);
  }

  for (const player of players) {
    const teamId = createdTeams.get(player.currentTeamName);
    if (!teamId) {
      throw new Error(`Missing team for player ${player.name}`);
    }

    const createdPlayer = await prisma.player.create({
      data: {
        name: player.name,
        birthDate: new Date(player.birthDate),
        nationality: player.nationality,
        position: player.position,
        photoUrl: player.photoUrl,
        currentTeamId: teamId
      }
    });

    for (const stat of player.stats) {
      const seasonId = createdSeasons.get(stat.seasonYear);
      if (!seasonId) {
        throw new Error(`Missing season for player ${player.name}`);
      }

      await prisma.playerStats.create({
        data: {
          playerId: createdPlayer.id,
          seasonId,
          matchesPlayed: stat.matchesPlayed,
          starts: stat.starts,
          goals: stat.goals,
          assists: stat.assists,
          yellowCards: stat.yellowCards,
          redCards: stat.redCards,
          minutesPlayed: stat.minutesPlayed,
          shots: stat.shots,
          shotsOnTarget: stat.shotsOnTarget,
          keyPasses: stat.keyPasses,
          tackles: stat.tackles,
          interceptions: stat.interceptions,
          dribblesCompleted: stat.dribblesCompleted,
          passAccuracy: stat.passAccuracy
        }
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    await prisma.$disconnect();
    console.error(error);
    process.exit(1);
  });
