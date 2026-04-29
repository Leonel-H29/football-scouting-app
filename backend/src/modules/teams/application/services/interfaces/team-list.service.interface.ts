import type { ListTeamsQuery } from '../../../domain/interfaces/list-teams-query.interface';
import type { Team } from '../../../domain/interfaces/team.interface';

export interface TeamListService {
  list(criteria: ListTeamsQuery): Promise<ReadonlyArray<Team>>;
}
