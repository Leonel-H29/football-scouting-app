import {
  addDays,
  startOfTodayUtc,
  subtractYears,
} from '../../../../shared/timezones/date-utils';
import type { PlayerFilterService } from './interfaces/player-filter.service.interface';
import type { PlayerSearchCriteria } from '../../domain/interfaces/player-search-criteria.interface';
import type { SearchPlayersQuery } from '../../domain/interfaces/search-players-query.interface';

export class PlayerFilterServiceImpl implements PlayerFilterService {
  buildCriteria(dto: SearchPlayersQuery): PlayerSearchCriteria {
    const referenceDate = startOfTodayUtc();

    return {
      name: dto.name?.trim(),
      position: dto.position,
      nationality: dto.nationality?.trim(),
      birthDateFrom:
        dto.maxAge !== undefined
          ? addDays(subtractYears(referenceDate, dto.maxAge + 1), 1)
          : undefined,
      birthDateTo:
        dto.minAge !== undefined
          ? subtractYears(referenceDate, dto.minAge)
          : undefined,
    };
  }
}
