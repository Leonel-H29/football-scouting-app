import { Position } from '@/shared/types/domain/Position';

export interface PlayerQuery {
  name: string;
  position: Position | 'ALL';
  nationality: string;
  minAge: string;
  maxAge: string;
}
