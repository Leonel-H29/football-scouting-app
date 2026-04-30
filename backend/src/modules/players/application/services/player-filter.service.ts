import {
  addDays,
  startOfTodayUtc,
  subtractYears,
} from '../../../../shared/timezones/date-utils';
import type { PlayerFilterService } from './interfaces/player-filter.service.interface';
import type { PlayerSearchCriteria } from '../../domain/interfaces/player-search-criteria.interface';
import type { SearchPlayersQuery } from '../../domain/interfaces/search-players-query.interface';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;

export class PlayerFilterServiceImpl implements PlayerFilterService {
  buildCriteria(dto: SearchPlayersQuery): PlayerSearchCriteria {
    const referenceDate = startOfTodayUtc();
    const page = dto.page ?? DEFAULT_PAGE;
    const limit = dto.limit ?? DEFAULT_LIMIT;

    return {
      ...(dto.name?.trim() ? { name: dto.name.trim() } : {}),
      ...(dto.position !== undefined ? { position: dto.position } : {}),
      ...(dto.nationality?.trim()
        ? { nationality: dto.nationality.trim() }
        : {}),
      ...(dto.maxAge !== undefined
        ? {
            birthDateFrom: addDays(
              subtractYears(referenceDate, dto.maxAge + 1),
              1
            ),
          }
        : {}),
      ...(dto.minAge !== undefined
        ? { birthDateTo: subtractYears(referenceDate, dto.minAge) }
        : {}),
      page,
      limit,
    };
  }
}
