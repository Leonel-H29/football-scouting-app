
import { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck, GitCompareArrows, Shirt } from 'lucide-react';
import { PlayerListItem } from '@/shared/types/domain';
import { PLAYER_AVATAR_FALLBACK } from '@/shared/constants/media';
import { Button } from '@/ui/components/common/Button';
import { Card } from '@/ui/components/common/Card';
import { Tag } from '@/ui/components/common/Tag';
import { formatDate, formatInteger } from '@/shared/utils/format';

interface Props {
  item: PlayerListItem;
  selected: boolean;
  favorite: boolean;
  onSelect: (playerId: string) => void;
  onToggleFavorite: (playerId: string) => void;
  canSelect: boolean;
}

export const PlayerCard = ({ item, selected, favorite, onSelect, onToggleFavorite, canSelect }: Props) => {
  const { player, latestStat } = item;
  const initialAvatarSrc = player.photoUrl && player.photoUrl.length > 0 ? player.photoUrl : PLAYER_AVATAR_FALLBACK;
  const [avatarSrc, setAvatarSrc] = useState(initialAvatarSrc);

  useEffect(() => {
    setAvatarSrc(initialAvatarSrc);
  }, [initialAvatarSrc]);

  return (
    <Card className={`player-card${selected ? ' player-card--selected' : ''}`}>
      <div className="player-card__header">
        <img
          src={avatarSrc}
          alt={player.name}
          className="player-card__avatar"
          loading="lazy"
          onError={() => setAvatarSrc(PLAYER_AVATAR_FALLBACK)}
        />
        <div>
          <div className="player-card__title-row">
            <h3>{player.name}</h3>
            <button className="icon-button" type="button" onClick={() => onToggleFavorite(player.id)} aria-label={`Toggle favorite for ${player.name}`}>
              {favorite ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          </div>
          <p>{player.position} · {player.age} years · {player.nationality}</p>
        </div>
      </div>

      <div className="player-card__meta">
        <Tag tone="accent"><Shirt size={14} /> {player.currentTeam.name}</Tag>
        {latestStat ? <Tag tone="success">{latestStat.season.name}</Tag> : <Tag>No stats</Tag>}
      </div>

      <div className="player-card__stats">
        <div><span>Goals</span><strong>{latestStat ? formatInteger(latestStat.goals) : '—'}</strong></div>
        <div><span>Assists</span><strong>{latestStat ? formatInteger(latestStat.assists) : '—'}</strong></div>
        <div><span>Minutes</span><strong>{latestStat ? formatInteger(latestStat.minutesPlayed) : '—'}</strong></div>
        <div><span>Born</span><strong>{formatDate(player.birthDate)}</strong></div>
      </div>

      <div className="player-card__footer">
        <Button type="button" variant={selected ? 'secondary' : 'primary'} onClick={() => onSelect(player.id)} disabled={!selected && !canSelect}>
          <GitCompareArrows size={16} /> {selected ? 'Selected' : canSelect ? 'Select for compare' : 'Limit reached'}
        </Button>
      </div>
    </Card>
  );
};
