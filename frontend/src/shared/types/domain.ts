export type Position = 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';

export interface Team {
  id: string;
  name: string;
  country: string;
  logoUrl: string;
}

export interface Season {
  id: string;
  year: number;
  name: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

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

export interface PlayerLatestStat {
  season: Season;
  matchesPlayed: number;
  starts: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  shots: number;
  shotsOnTarget: number;
  keyPasses: number;
  tackles: number;
  interceptions: number;
  dribblesCompleted: number;
  passAccuracy: number;
}

export interface PlayerListItem {
  player: PlayerSummary;
  latestStat: PlayerLatestStat | null;
}

export interface PlayerSearchResult {
  items: PlayerListItem[];
  pagination: PaginationMeta;
}

export interface CompareRowValue {
  playerId: string;
  playerName: string;
  value: number | string | null;
}

export interface CompareRow {
  key: string;
  label: string;
  values: CompareRowValue[];
}

export interface CompareResult {
  season: Season | null;
  players: PlayerSummary[];
  rows: CompareRow[];
}

export interface AuthSession {
  accessToken: string;
  tokenType: 'Bearer';
}

export interface AuthUser {
  id: string;
  name: string;
  surname: string;
  email: string;
  username: string;
}

export interface RegisterPayload {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UpdateUserPayload {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface PlayerQuery {
  name: string;
  position: Position | 'ALL';
  nationality: string;
  minAge: string;
  maxAge: string;
}

export interface PlayerListFilters {
  name?: string;
  position?: Position;
  nationality?: string;
  minAge?: number;
  maxAge?: number;
  page?: number;
  limit?: number | 'ALL';
}
