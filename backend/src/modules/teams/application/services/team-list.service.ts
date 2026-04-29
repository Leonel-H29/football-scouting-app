import type { TeamListService } from './interfaces/team-list.service.interface';
import type { TeamRepository } from '../../domain/repositories/team-repository.interface';
import type { ListTeamsQuery } from '../../domain/interfaces/list-teams-query.interface';
import type { Team } from '../../domain/interfaces/team.interface';

export class TeamListServiceImpl implements TeamListService {
  constructor(private readonly teamRepository: TeamRepository) {}

  async list(criteria: ListTeamsQuery): Promise<ReadonlyArray<Team>> {
    const teams = await this.teamRepository.list({
      name: criteria.name?.trim(),
      country: criteria.country?.trim(),
    });

    return [...teams].sort((left, right) =>
      left.name.localeCompare(right.name)
    );
  }
}
