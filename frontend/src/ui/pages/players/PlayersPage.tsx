import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PlayerCard } from '@/ui/components/players/PlayerCard';
import { PlayerFilters } from '@/ui/components/players/PlayerFilters';
import {
  PlayersPagination,
  PlayerPageSize,
} from '@/ui/components/players/PlayersPagination';
import { EmptyState } from '@/ui/components/common/EmptyState';
import { Skeleton } from '@/ui/components/common/Skeleton';
import { Button } from '@/ui/components/common/Button';
import { useFavorites } from '@/ui/hooks/useFavorites';
import { usePlayerSelection } from '@/ui/hooks/usePlayerSelection';
import { usePlayers } from '@/ui/hooks/usePlayers';
import { PlayerQuery, Position } from '@/shared/types/domain';

const positions: readonly Position[] = [
  'GOALKEEPER',
  'DEFENDER',
  'MIDFIELDER',
  'FORWARD',
];
const DEFAULT_PAGE_SIZE: PlayerPageSize = 10;
const ALL_PAGE_SIZE_LIMIT = 100;

const buildQuery = (params: URLSearchParams): PlayerQuery => ({
  name: params.get('name') ?? '',
  position: (params.get('position') as Position | 'ALL' | null) ?? 'ALL',
  nationality: params.get('nationality') ?? '',
  minAge: params.get('minAge') ?? '',
  maxAge: params.get('maxAge') ?? '',
});

const parsePage = (value: string | null): number => {
  const parsed = Number(value ?? '1');
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
};

const parsePageSize = (value: string | null): PlayerPageSize => {
  if (value === 'ALL') return 'ALL';
  const parsed = Number(value ?? DEFAULT_PAGE_SIZE);
  return parsed === 5 || parsed === 10 || parsed === 20
    ? parsed
    : DEFAULT_PAGE_SIZE;
};

export const PlayersPage = () => {
  const [params, setParams] = useSearchParams();
  const query = useMemo(() => buildQuery(params), [params]);
  const page = useMemo(() => parsePage(params.get('page')), [params]);
  const pageSize = useMemo(() => parsePageSize(params.get('limit')), [params]);
  const {
    selectedPlayerIds,
    togglePlayerId,
    clearSelectedPlayerIds,
    isPlayerSelected,
  } = usePlayerSelection();
  const { toggle, isFavorite } = useFavorites();

  const filters = useMemo(
    () => ({
      name: query.name,
      position: query.position === 'ALL' ? undefined : query.position,
      nationality: query.nationality,
      minAge: query.minAge ? Number(query.minAge) : undefined,
      maxAge: query.maxAge ? Number(query.maxAge) : undefined,
      page,
      limit: pageSize === 'ALL' ? ALL_PAGE_SIZE_LIMIT : pageSize,
    }),
    [page, pageSize, query]
  );

  const { players, pagination, loading, error } = usePlayers(filters);

  const updateParams = (next: Record<string, string | number | undefined>) => {
    const nextParams = new URLSearchParams(params);
    for (const [key, value] of Object.entries(next)) {
      if (value === undefined || value === '') {
        nextParams.delete(key);
      } else {
        nextParams.set(key, String(value));
      }
    }
    setParams(nextParams);
  };

  const handleFiltersChange = (next: PlayerQuery) => {
    updateParams({
      name: next.name,
      position: next.position !== 'ALL' ? next.position : undefined,
      nationality: next.nationality,
      minAge: next.minAge,
      maxAge: next.maxAge,
      page: 1,
      limit: pageSize,
    });
  };

  const handlePageChange = (nextPage: number) => {
    updateParams({ page: nextPage });
  };

  const handlePageSizeChange = (nextPageSize: PlayerPageSize) => {
    updateParams({
      page: 1,
      limit: nextPageSize,
    });
  };

  const handleSelect = (playerId: string) => {
    togglePlayerId(playerId);
  };

  const handleClearSelection = () => {
    clearSelectedPlayerIds();
  };

  const canSelectMore = selectedPlayerIds.length < 3;

  return (
    <div className="stack">
      <section className="section-header section-header--space">
        <div>
          <h2>Players</h2>
          <p className="muted">
            Search by name and refine the list with typed filters.
          </p>
        </div>
        <div className="section-header__actions">
          {selectedPlayerIds.length > 0 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={handleClearSelection}
            >
              Clear selection
            </Button>
          ) : null}
          {selectedPlayerIds.length > 0 ? (
            <Link className="button button--primary" to="/players/compare">
              Open compare
            </Link>
          ) : null}
        </div>
      </section>

      <PlayerFilters
        value={query}
        positions={positions}
        onChange={handleFiltersChange}
      />

      <div className="selection-bar">
        <span>{selectedPlayerIds.length} selected across pages</span>
      </div>

      {error ? (
        <EmptyState title="Unable to load players" subtitle={error} />
      ) : loading ? (
        <div className="player-grid">
          <Skeleton className="player-card" />
          <Skeleton className="player-card" />
          <Skeleton className="player-card" />
        </div>
      ) : (
        <>
          {players.length === 0 ? (
            <EmptyState
              title="No players found"
              subtitle="Try adjusting your filters or search term."
            />
          ) : (
            <div className="player-grid">
              {players.map((item) => (
                <PlayerCard
                  key={item.player.id}
                  item={item}
                  selected={isPlayerSelected(item.player.id)}
                  favorite={isFavorite(item.player.id)}
                  onSelect={handleSelect}
                  onToggleFavorite={toggle}
                  canSelect={canSelectMore || isPlayerSelected(item.player.id)}
                />
              ))}
            </div>
          )}

          <PlayersPagination
            pagination={pagination}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
};
