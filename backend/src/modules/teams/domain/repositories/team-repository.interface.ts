import type { TeamFilterCriteria } from '../interfaces/team-filter-criteria.interface';
import type { Team } from '../interfaces/team.interface';

export interface TeamRepository {
  list(criteria: TeamFilterCriteria): Promise<ReadonlyArray<Team>>;
  findById(teamId: string): Promise<Team | null>;
}
