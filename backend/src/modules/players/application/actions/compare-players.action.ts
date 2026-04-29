import type { ComparePlayersBody } from '../../domain/interfaces/compare-players-body.interface';
import type { PlayerComparisonService } from '../services/interfaces/player-comparison.service.interface';
import type { PlayerComparisonResult } from '../../domain/interfaces/player-comparison-result.interface';

export class ComparePlayersAction {
  constructor(
    private readonly playerComparisonService: PlayerComparisonService
  ) {}

  async execute(dto: ComparePlayersBody): Promise<PlayerComparisonResult> {
    return this.playerComparisonService.comparePlayers(
      dto.playerIds,
      dto.seasonId
    );
  }
}
