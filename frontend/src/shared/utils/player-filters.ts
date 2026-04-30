import { PlayerListFilters, PlayerListItem } from '@/shared/types/domain';

const includesNormalized = (source: string, search: string): boolean =>
  source.toLowerCase().includes(search.trim().toLowerCase());

export const filterPlayers = (items: PlayerListItem[], filters: PlayerListFilters): PlayerListItem[] => {
  const name = filters.name?.trim().toLowerCase() ?? '';
  const nationality = filters.nationality?.trim().toLowerCase() ?? '';

  return items.filter((item) => {
    const matchesName = name.length === 0 || includesNormalized(item.player.name, name);
    const matchesPosition = !filters.position || item.player.position === filters.position;
    const matchesNationality = nationality.length === 0 || includesNormalized(item.player.nationality, nationality);
    const matchesMinAge = filters.minAge === undefined || item.player.age >= filters.minAge;
    const matchesMaxAge = filters.maxAge === undefined || item.player.age <= filters.maxAge;

    return matchesName && matchesPosition && matchesNationality && matchesMinAge && matchesMaxAge;
  });
};
