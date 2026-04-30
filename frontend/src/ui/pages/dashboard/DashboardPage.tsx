import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Trophy, Users, ShieldCheck } from 'lucide-react';
import { usePlayers } from '@/ui/hooks/usePlayers';
import { useFavorites } from '@/ui/hooks/useFavorites';
import { Card } from '@/ui/components/common/Card';
import { EmptyState } from '@/ui/components/common/EmptyState';
import { Skeleton } from '@/ui/components/common/Skeleton';
import { MetricPill } from '@/ui/components/common/MetricPill';
import { formatInteger } from '@/shared/utils/format';

export const DashboardPage = () => {
  const filters = useMemo(() => ({ name: '', position: undefined, nationality: '', minAge: undefined, maxAge: undefined }), []);
  const { players, loading } = usePlayers(filters);
  const { favorites } = useFavorites();

  const overview = useMemo(() => {
    const goals = players.reduce((total, item) => total + (item.latestStat?.goals ?? 0), 0);
    const assists = players.reduce((total, item) => total + (item.latestStat?.assists ?? 0), 0);
    const teams = new Set(players.map((item) => item.player.currentTeam.name)).size;
    return { goals, assists, teams };
  }, [players]);

  return (
    <div className="page-grid">
      <section className="hero-card">
        <div>
          <p className="eyebrow">Overview</p>
          <h2>Track talent, compare profiles, and shortlist prospects.</h2>
          <p className="muted">A production-oriented frontend built with a hexagonal structure, typed adapters, and accessible UI primitives.</p>
        </div>
        <Link className="button button--primary" to="/players">
          Explore players <ArrowRight size={16} />
        </Link>
      </section>

      <section className="metrics-grid">
        <Card><MetricPill label="Players" value={loading ? '...' : formatInteger(players.length)} /></Card>
        <Card><MetricPill label="Goals" value={loading ? '...' : formatInteger(overview.goals)} /></Card>
        <Card><MetricPill label="Assists" value={loading ? '...' : formatInteger(overview.assists)} /></Card>
        <Card><MetricPill label="Teams" value={loading ? '...' : formatInteger(overview.teams)} /></Card>
      </section>

      <section className="dashboard-grid">
        <Card>
          <div className="card__header"><h3>Favorites</h3><Heart size={18} /></div>
          <div className="dashboard-list">
            {favorites.length === 0 ? (
              <EmptyState title="No favorites yet" subtitle="Save players from the list to build a shortlist." />
            ) : favorites.map((id) => <div key={id} className="dashboard-list__item">{id}</div>)}
          </div>
        </Card>
        <Card>
          <div className="card__header"><h3>Snapshot</h3><ShieldCheck size={18} /></div>
          <div className="dashboard-snapshot">
            <div><Trophy size={18} /><span>High performing forward lines</span></div>
            <div><Users size={18} /><span>Search, compare and shortlist in one flow</span></div>
          </div>
        </Card>
      </section>

      <section>
        <div className="section-header">
          <h3>Latest players</h3>
          <Link to="/players">See all</Link>
        </div>
        <div className="preview-grid">
          {loading ? (
            <>
              <Skeleton className="preview-card" />
              <Skeleton className="preview-card" />
              <Skeleton className="preview-card" />
            </>
          ) : players.slice(0, 3).map((item) => (
            <Card key={item.player.id} className="preview-card">
              <strong>{item.player.name}</strong>
              <span>{item.player.currentTeam.name}</span>
              <span>{item.player.position}</span>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
