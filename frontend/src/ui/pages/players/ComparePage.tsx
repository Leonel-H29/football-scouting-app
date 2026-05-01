
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ComparisonRadar } from '@/ui/components/players/ComparisonRadar';
import { ComparisonTable } from '@/ui/components/players/ComparisonTable';
import { EmptyState } from '@/ui/components/common/EmptyState';
import { Skeleton } from '@/ui/components/common/Skeleton';
import { Select } from '@/ui/components/common/Select';
import { useComparePlayers, useSeasons } from '@/ui/hooks/usePlayers';
import { usePlayerSelection } from '@/ui/hooks/usePlayerSelection';

export const ComparePage = () => {
  const [params, setParams] = useSearchParams();
  const { selectedPlayerIds } = usePlayerSelection();
  const seasonId = params.get('seasonId') ?? undefined;
  const seasons = useSeasons();
  const ids = useMemo(() => selectedPlayerIds.slice(0, 3), [selectedPlayerIds]);
  const { data, loading, error } = useComparePlayers(ids, seasonId);

  const changeSeason = (nextSeasonId: string) => {
    const next = new URLSearchParams(params);
    if (nextSeasonId) {
      next.set('seasonId', nextSeasonId);
    } else {
      next.delete('seasonId');
    }
    setParams(next);
  };

  return (
    <div className="stack">
      <section className="section-header section-header--space">
        <div>
          <h2>Compare players</h2>
          <p className="muted">Select 2 to 3 players and review statistical differences side by side.</p>
        </div>
      </section>

      <div className="filters-grid">
        <Select label="Season" value={seasonId ?? ''} onChange={(event) => changeSeason(event.target.value)}>
          <option value="">Latest common season</option>
          {seasons.map((season) => <option key={season.id} value={season.id}>{season.name}</option>)}
        </Select>
      </div>

      {loading ? <Skeleton className="comparison-skeleton" /> : null}
      {error ? <EmptyState title="Unable to compare players" subtitle={error} /> : null}
      {!loading && !error && data ? (
        <div className="comparison-grid">
          <ComparisonRadar data={data} />
          <ComparisonTable data={data} />
        </div>
      ) : null}
      {!loading && ids.length < 2 ? <EmptyState title="Pick at least two players" subtitle="Go to the players list or favorites page and select up to three profiles." /> : null}
    </div>
  );
};
