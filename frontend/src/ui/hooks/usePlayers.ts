
import { useEffect, useState } from 'react';
import { useDependencies } from '@/app/providers/AppProviders';
import { CompareResult, PaginationMeta, PlayerListFilters, PlayerListItem, Season, Team } from '@/shared/types/domain';

export const usePlayers = (filters: PlayerListFilters) => {
  const { playerRepository } = useDependencies();
  const [players, setPlayers] = useState<PlayerListItem[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const filtersKey = JSON.stringify(filters);

  useEffect(() => {
    let isActive = true;
    setLoading(true);
    setError(null);

    playerRepository.search(filters).then((result) => {
      if (!isActive) return;
      if (result.ok) {
        setPlayers(result.value.items);
        setPagination(result.value.pagination);
      } else {
        setPlayers([]);
        setPagination(null);
        setError(result.error);
      }
      setLoading(false);
    });

    return () => { isActive = false; };
  }, [filtersKey, playerRepository]);

  return { players, pagination, loading, error };
};

export const useComparePlayers = (playerIds: readonly string[], seasonId?: string) => {
  const { playerRepository } = useDependencies();
  const [data, setData] = useState<CompareResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idsKey = playerIds.join(',');
  const seasonKey = seasonId ?? '';

  useEffect(() => {
    if (playerIds.length < 2) {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    let isActive = true;
    setLoading(true);
    setError(null);

    playerRepository.compare(playerIds, seasonId).then((result) => {
      if (!isActive) return;
      if (result.ok) setData(result.value);
      else {
        setData(null);
        setError(result.error);
      }
      setLoading(false);
    });

    return () => { isActive = false; };
  }, [idsKey, seasonKey, playerRepository]);

  return { data, loading, error };
};

export const useSeasons = () => {
  const { playerRepository } = useDependencies();
  const [seasons, setSeasons] = useState<Season[]>([]);

  useEffect(() => {
    playerRepository.listSeasons().then((result) => {
      if (result.ok) setSeasons(result.value);
    });
  }, [playerRepository]);

  return seasons;
};

export const useTeams = () => {
  const { playerRepository } = useDependencies();
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    playerRepository.listTeams().then((result) => {
      if (result.ok) setTeams(result.value);
    });
  }, [playerRepository]);

  return teams;
};
