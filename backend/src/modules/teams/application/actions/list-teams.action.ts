import type { TeamListService } from '../services/interfaces/team-list.service.interface';
import type { ListTeamsQuery } from '../../domain/interfaces/list-teams-query.interface';
import type { Team } from '../../domain/interfaces/team.interface';

export class ListTeamsAction {
  constructor(private readonly teamListService: TeamListService) {}

  async execute(criteria: ListTeamsQuery): Promise<ReadonlyArray<Team>> {
    return this.teamListService.list(criteria);
  }
}
