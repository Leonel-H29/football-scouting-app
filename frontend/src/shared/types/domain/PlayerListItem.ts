import { PlayerLatestStat } from '@/shared/types/domain/PlayerLatestStat';
import { PlayerSummary } from '@/shared/types/domain/PlayerSummary';

export interface PlayerListItem {
  player: PlayerSummary;
  latestStat: PlayerLatestStat | null;
}
