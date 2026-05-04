import { Position } from '@/shared/types/domain/Position';

export interface PlayerListFilters {
  name?: string;
  position?: Position;
  nationality?: string;
  minAge?: number;
  maxAge?: number;
  page?: number;
  limit?: number | 'ALL';
}
