import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PlayerCard } from '@/ui/components/players/PlayerCard';
import { PlayerFilters } from '@/ui/components/players/PlayerFilters';
import { EmptyState } from '@/ui/components/common/EmptyState';
import { Skeleton } from '@/ui/components/common/Skeleton';
import { useFavorites } from '@/ui/hooks/useFavorites';
import { usePlayers } from '@/ui/hooks/usePlayers';
import { PlayerQuery, Position } from '@/shared/types/domain';

const positions: readonly Position[] = ['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD'];

const buildQuery = (params: URLSearchParams): PlayerQuery => ({
  name: params.get('name') ?? '',
  position: (params.get('position') as Position | 'ALL' | null) ?? 'ALL',
  nationality: params.get('nationality') ?? '',
  minAge: params.get('minAge') ?? '',
  maxAge: params.get('maxAge') ?? '',
});

export const PlayersPage = () => {
  const [params, setParams] = useSearchParams();
  const query = useMemo(() => buildQuery(params), [params]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const { toggle, isFavorite } = useFavorites();
  const filters = useMemo(() => ({
    name: query.name,
    position: query.position === 'ALL' ? undefined : query.position,
    nationality: query.nationality,
    minAge: query.minAge ? Number(query.minAge) : undefined,
    maxAge: query.maxAge ? Number(query.maxAge) : undefined,
  }), [query]);
  const { players, loading, error } = usePlayers(filters);

  const handleFiltersChange = (next: PlayerQuery) => {
    const nextParams = new URLSearchParams();
    if (next.name) nextParams.set('name', next.name);
    if (next.position !== 'ALL') nextParams.set('position', next.position);
    if (next.nationality) nextParams.set('nationality', next.nationality);
    if (next.minAge) nextParams.set('minAge', next.minAge);
    if (next.maxAge) nextParams.set('maxAge', next.maxAge);
    setParams(nextParams);
  };

  const handleSelect = (playerId: string) => {
    setSelectedPlayers((current) => current.includes(playerId)
      ? current.filter((item) => item !== playerId)
      : [...current, playerId].slice(0, 3));
  };

  return (
    <div className="stack">
      <section className="section-header section-header--space">
        <div>
          <h2>Players</h2>
          <p className="muted">Search by name and refine the list with typed filters.</p>
        </div>
        <Link className="button button--secondary" to={`/players/compare?ids=${selectedPlayers.join(',')}`}>Open compare</Link>
      </section>

      <PlayerFilters value={query} positions={positions} onChange={handleFiltersChange} />

      <div className="selection-bar">
        <span>{selectedPlayers.length} selected</span>
        <Link className="button button--secondary" to={`/players/compare?ids=${selectedPlayers.join(',')}`}>Compare selected</Link>
      </div>

      {error ? <EmptyState title="Unable to load players" subtitle={error} /> : null}
      {loading ? (
        <div className="player-grid">
          <Skeleton className="player-card" />
          <Skeleton className="player-card" />
          <Skeleton className="player-card" />
        </div>
      ) : players.length === 0 ? (
        <EmptyState title="No players found" subtitle="Try adjusting your filters or search term." />
      ) : (
        <div className="player-grid">
          {players.map((item) => (
            <PlayerCard
              key={item.player.id}
              item={item}
              selected={selectedPlayers.includes(item.player.id)}
              favorite={isFavorite(item.player.id)}
              onSelect={handleSelect}
              onToggleFavorite={toggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};
