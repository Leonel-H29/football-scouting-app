import { prismaClient } from '../clients/prisma/prisma-config';
import { PrismaPlayerRepository } from '../modules/players/infrastructure/repositories/prisma-player.repository';
import { PlayerFilterServiceImpl } from '../modules/players/application/services/player-filter.service';
import { PlayerComparisonServiceImpl } from '../modules/players/application/services/player-comparison.service';
import { SearchPlayersAction } from '../modules/players/application/actions/search-players.action';
import { ComparePlayersAction } from '../modules/players/application/actions/compare-players.action';
import { PlayersController } from '../modules/players/infrastructure/controllers/players.controller';
import { PrismaTeamRepository } from '../modules/teams/infrastructure/repositories/prisma-team.repository';
import { TeamListServiceImpl } from '../modules/teams/application/services/team-list.service';
import { ListTeamsAction } from '../modules/teams/application/actions/list-teams.action';
import { TeamsController } from '../modules/teams/infrastructure/controllers/teams.controller';
import { PrismaSeasonRepository } from '../modules/seasons/infrastructure/repositories/prisma-season.repository';
import { SeasonListServiceImpl } from '../modules/seasons/application/services/season-list.service';
import { ListSeasonsAction } from '../modules/seasons/application/actions/list-seasons.action';
import { SeasonsController } from '../modules/seasons/infrastructure/controllers/seasons.controller';

export const createControllers = (): {
  readonly playersController: PlayersController;
  readonly teamsController: TeamsController;
  readonly seasonsController: SeasonsController;
} => {
  const playerRepository = new PrismaPlayerRepository(prismaClient);
  const playerFilterService = new PlayerFilterServiceImpl();
  const playerComparisonService = new PlayerComparisonServiceImpl(playerRepository);
  const searchPlayersAction = new SearchPlayersAction(playerRepository, playerFilterService);
  const comparePlayersAction = new ComparePlayersAction(playerComparisonService);

  const teamRepository = new PrismaTeamRepository(prismaClient);
  const teamListService = new TeamListServiceImpl(teamRepository);
  const listTeamsAction = new ListTeamsAction(teamListService);

  const seasonRepository = new PrismaSeasonRepository(prismaClient);
  const seasonListService = new SeasonListServiceImpl(seasonRepository);
  const listSeasonsAction = new ListSeasonsAction(seasonListService);

  return {
    playersController: new PlayersController(searchPlayersAction, comparePlayersAction),
    teamsController: new TeamsController(listTeamsAction),
    seasonsController: new SeasonsController(listSeasonsAction)
  };
};
