import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EmptyState } from '@/ui/components/common/EmptyState';
import { Skeleton } from '@/ui/components/common/Skeleton';
import { Button } from '@/ui/components/common/Button';
import { PlayerFilters } from '@/ui/components/players/PlayerFilters';
import {
  PlayersPagination,
  PlayerPageSize,
} from '@/ui/components/players/PlayersPagination';
import { FavoritePlayerRow } from '@/ui/components/players/FavoritePlayerRow';
import { useFavorites } from '@/ui/hooks/useFavorites';
import { usePlayerSelection } from '@/ui/hooks/usePlayerSelection';
import { usePlayers } from '@/ui/hooks/usePlayers';
import { PlayerQuery, Position, PlayerListItem } from '@/shared/types/domain';

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

export const FavoritePlayersPage = () => {
  const [params, setParams] = useSearchParams();
  const query = useMemo(() => buildQuery(params), [params]);
  const page = useMemo(() => parsePage(params.get('page')), [params]);
  const pageSize = useMemo(() => parsePageSize(params.get('limit')), [params]);
  const {
    selectedPlayerIds,
    togglePlayerId,
    clearSelectedPlayerIds,
    removeSelectedPlayer,
    isPlayerSelected,
  } = usePlayerSelection();
  const { favorites, remove } = useFavorites();

  const filters = useMemo(
    () => ({
      name: query.name,
      position: query.position === 'ALL' ? undefined : query.position,
      nationality: query.nationality,
      minAge: query.minAge ? Number(query.minAge) : undefined,
      maxAge: query.maxAge ? Number(query.maxAge) : undefined,
      page: 1,
      limit: 'ALL' as const,
    }),
    [query]
  );

  const { players, loading, error } = usePlayers(filters);

  const favoriteItems = useMemo(
    () => players.filter((item) => favorites.includes(item.player.id)),
    [favorites, players]
  );

  const totalItems = favoriteItems.length;
  const canSelectMore = selectedPlayerIds.length < 3;
  const effectivePageSize =
    pageSize === 'ALL' ? Math.max(1, totalItems || 1) : pageSize;
  const totalPages = Math.max(1, Math.ceil(totalItems / effectivePageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const visibleItems = useMemo(() => {
    if (pageSize === 'ALL') {
      return favoriteItems;
    }
    const start = (currentPage - 1) * pageSize;
    return favoriteItems.slice(start, start + pageSize);
  }, [currentPage, favoriteItems, pageSize]);

  const updateQuery = (next: URLSearchParams) => {
    next.set('page', '1');
    setParams(next);
  };

  const handleFiltersChange = (next: PlayerQuery) => {
    const nextParams = new URLSearchParams(params);
    if (next.name) nextParams.set('name', next.name);
    else nextParams.delete('name');
    if (next.position !== 'ALL') nextParams.set('position', next.position);
    else nextParams.delete('position');
    if (next.nationality) nextParams.set('nationality', next.nationality);
    else nextParams.delete('nationality');
    if (next.minAge) nextParams.set('minAge', next.minAge);
    else nextParams.delete('minAge');
    if (next.maxAge) nextParams.set('maxAge', next.maxAge);
    else nextParams.delete('maxAge');
    updateQuery(nextParams);
  };

  const handlePageChange = (nextPage: number) => {
    const nextParams = new URLSearchParams(params);
    nextParams.set('page', String(nextPage));
    setParams(nextParams);
  };

  const handlePageSizeChange = (nextPageSize: PlayerPageSize) => {
    const nextParams = new URLSearchParams(params);
    nextParams.set('limit', String(nextPageSize));
    nextParams.set('page', '1');
    setParams(nextParams);
  };

  const handleRemoveFavorite = (playerId: string) => {
    remove(playerId);
    if (isPlayerSelected(playerId)) {
      removeSelectedPlayer(playerId);
    }
  };

  return (
    <div className="stack">
      <section className="section-header section-header--space">
        <div>
          <h2>Favorite players</h2>
          <p className="muted">
            Manage your shortlist, compare selected favorites, and keep the list
            up to date.
          </p>
        </div>
        <div className="section-header__actions">
          <Link className="button button--secondary" to="/players">
            Back to players
          </Link>
          {selectedPlayerIds.length > 0 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={clearSelectedPlayerIds}
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

      {error ? (
        <EmptyState title="Unable to load favorites" subtitle={error} />
      ) : null}
      {loading ? (
        <div className="stack">
          <Skeleton className="favorite-player-row" />
          <Skeleton className="favorite-player-row" />
          <Skeleton className="favorite-player-row" />
        </div>
      ) : favoriteItems.length === 0 ? (
        <EmptyState
          title="No favorite players match the filters"
          subtitle="Try relaxing the filters or add more players to favorites."
        />
      ) : (
        <>
          <div className="favorite-list">
            {visibleItems.map((item: PlayerListItem) => (
              <FavoritePlayerRow
                key={item.player.id}
                item={item}
                selected={selectedPlayerIds.includes(item.player.id)}
                onSelect={togglePlayerId}
                onRemoveFavorite={handleRemoveFavorite}
                canSelect={
                  canSelectMore || selectedPlayerIds.includes(item.player.id)
                }
              />
            ))}
          </div>
          <PlayersPagination
            pagination={{
              page: currentPage,
              limit: effectivePageSize,
              totalItems,
              totalPages,
              hasNextPage: currentPage < totalPages,
              hasPreviousPage: currentPage > 1,
            }}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}
    </div>
  );
};
