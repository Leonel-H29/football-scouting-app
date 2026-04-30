import { PlayerRepository } from '@/domain/ports/player.port';
import { HttpClient } from '@/infrastructure/api/http-client';
import { CompareResult, PlayerListFilters, PlayerListItem, Season, Team } from '@/shared/types/domain';
import { Result, err, ok } from '@/shared/types/result';

interface PlayerSearchResponseItem {
  player: PlayerListItem['player'];
  latestStat: PlayerListItem['latestStat'];
}

interface CompareResponse extends CompareResult {}

export class HttpPlayerRepository implements PlayerRepository {
  constructor(private readonly client: HttpClient) {}

  async search(filters: PlayerListFilters): Promise<Result<PlayerListItem[], string>> {
    const params = new URLSearchParams();
    if (filters.name) params.set('name', filters.name);
    if (filters.position) params.set('position', filters.position);
    if (filters.nationality) params.set('nationality', filters.nationality);
    if (filters.minAge !== undefined) params.set('minAge', String(filters.minAge));
    if (filters.maxAge !== undefined) params.set('maxAge', String(filters.maxAge));

    const result = await this.client.request<PlayerSearchResponseItem[]>(`/api/players?${params.toString()}`);
    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Unable to load players.');
    }
    return ok(result.data);
  }

  async compare(playerIds: readonly string[], seasonId?: string): Promise<Result<CompareResult, string>> {
    const result = await this.client.request<CompareResponse>('/api/players/compare', {
      method: 'POST',
      body: JSON.stringify({ playerIds, ...(seasonId ? { seasonId } : {}) }),
    });
    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Unable to compare players.');
    }
    return ok(result.data);
  }

  async listSeasons(): Promise<Result<Season[], string>> {
    const result = await this.client.request<Season[]>('/api/seasons');
    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Unable to load seasons.');
    }
    return ok(result.data);
  }

  async listTeams(): Promise<Result<Team[], string>> {
    const result = await this.client.request<Team[]>('/api/teams');
    if (!result.ok || !result.data) {
      return err(result.error?.message ?? 'Unable to load teams.');
    }
    return ok(result.data);
  }
}
