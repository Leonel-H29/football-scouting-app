export const PLAYER_POSITIONS = ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'] as const;

export type PlayerPosition = (typeof PLAYER_POSITIONS)[number];
