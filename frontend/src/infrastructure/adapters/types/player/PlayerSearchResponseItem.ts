import { PlayerSearchResult } from '@/shared/types/domain';

export interface PlayerSearchResponseItem {
  player: PlayerSearchResult['items'][number]['player'];
  latestStat: PlayerSearchResult['items'][number]['latestStat'];
}
