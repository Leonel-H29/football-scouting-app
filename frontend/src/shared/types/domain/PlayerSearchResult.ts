import { PaginationMeta } from '@/shared/types/domain/PaginationMeta';
import { PlayerListItem } from '@/shared/types/domain/PlayerListItem';

export interface PlayerSearchResult {
  items: PlayerListItem[];
  pagination: PaginationMeta;
}
