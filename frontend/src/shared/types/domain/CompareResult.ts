import { CompareRow } from '@/shared/types/domain/CompareRow';
import { PlayerSummary } from '@/shared/types/domain/PlayerSummary';
import { Season } from '@/shared/types/domain/Season';

export interface CompareResult {
  season: Season | null;
  players: PlayerSummary[];
  rows: CompareRow[];
}
