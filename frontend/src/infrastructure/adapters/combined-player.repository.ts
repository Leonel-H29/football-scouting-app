import { PlayerRepository } from '@/domain/ports/player.port';
import { HttpPlayerRepository } from '@/infrastructure/adapters/http-player.repository';
import { MockPlayerRepository } from '@/infrastructure/adapters/mock-player.repository';
import { CompareResult, PlayerListFilters, PlayerSearchResult, Season, Team } from '@/shared/types/domain';
import { Result } from '@/shared/types/result';

const shouldFallback = (message: string): boolean => message.toLowerCase().includes('unable to reach');

export class CombinedPlayerRepository implements PlayerRepository {
  constructor(
    private readonly httpRepository: HttpPlayerRepository,
    private readonly mockRepository: MockPlayerRepository,
  ) {}

  async search(filters: PlayerListFilters): Promise<Result<PlayerSearchResult, string>> {
    const result = await this.httpRepository.search(filters);
    if (!result.ok && shouldFallback(result.error)) {
      return this.mockRepository.search(filters);
    }
    return result;
  }

  async compare(playerIds: readonly string[], seasonId?: string): Promise<Result<CompareResult, string>> {
    const result = await this.httpRepository.compare(playerIds, seasonId);
    if (!result.ok && shouldFallback(result.error)) {
      return this.mockRepository.compare(playerIds, seasonId);
    }
    return result;
  }

  async listSeasons(): Promise<Result<Season[], string>> {
    const result = await this.httpRepository.listSeasons();
    if (!result.ok && shouldFallback(result.error)) {
      return this.mockRepository.listSeasons();
    }
    return result;
  }

  async listTeams(): Promise<Result<Team[], string>> {
    const result = await this.httpRepository.listTeams();
    if (!result.ok && shouldFallback(result.error)) {
      return this.mockRepository.listTeams();
    }
    return result;
  }
}
