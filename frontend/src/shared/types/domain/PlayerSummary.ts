import { Position } from '@/shared/types/domain/Position';
import { Team } from '@/shared/types/domain/Team';

export interface PlayerSummary {
  id: string;
  name: string;
  birthDate: string;
  age: number;
  nationality: string;
  position: Position;
  photoUrl: string | null;
  currentTeam: Team;
}
