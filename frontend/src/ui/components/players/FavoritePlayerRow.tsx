
import { GitCompareArrows, Shirt, Trash2 } from 'lucide-react';
import { PlayerListItem } from '@/shared/types/domain';
import { PLAYER_AVATAR_FALLBACK } from '@/shared/constants/media';
import { Button } from '@/ui/components/common/Button';
import { Card } from '@/ui/components/common/Card';
import { Tag } from '@/ui/components/common/Tag';
import { formatInteger } from '@/shared/utils/format';

interface Props {
  item: PlayerListItem;
  selected?: boolean;
  onSelect?: (playerId: string) => void;
  onRemoveFavorite?: (playerId: string) => void;
  canSelect?: boolean;
}

export const FavoritePlayerRow = ({ item, selected = false, onSelect, onRemoveFavorite, canSelect = true }: Props) => {
  const { player, latestStat } = item;
  const avatarSrc = player.photoUrl && player.photoUrl.length > 0 ? player.photoUrl : PLAYER_AVATAR_FALLBACK;

  return (
    <Card className={`favorite-player-row${selected ? ' favorite-player-row--selected' : ''}`}>
      <div className="favorite-player-row__main">
        <img
          src={avatarSrc}
          alt={player.name}
          className="favorite-player-row__avatar"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = PLAYER_AVATAR_FALLBACK;
          }}
        />
        <div className="favorite-player-row__content">
          <div className="favorite-player-row__title">
            <div>
              <h3>{player.name}</h3>
              <p>{player.position} · {player.age} years · {player.nationality}</p>
            </div>
            <Tag tone="accent"><Shirt size={14} /> {player.currentTeam.name}</Tag>
          </div>
          <div className="favorite-player-row__stats">
            <span>Goals <strong>{latestStat ? formatInteger(latestStat.goals) : '—'}</strong></span>
            <span>Assists <strong>{latestStat ? formatInteger(latestStat.assists) : '—'}</strong></span>
            <span>Minutes <strong>{latestStat ? formatInteger(latestStat.minutesPlayed) : '—'}</strong></span>
          </div>
        </div>
      </div>
      <div className="favorite-player-row__actions">
        {onSelect ? (
          <Button type="button" variant={selected ? 'secondary' : 'primary'} onClick={() => onSelect(player.id)} disabled={!selected && !canSelect}>
            <GitCompareArrows size={16} /> {selected ? 'Selected' : canSelect ? 'Select for compare' : 'Limit reached'}
          </Button>
        ) : null}
        {onRemoveFavorite ? (
          <Button type="button" variant="secondary" onClick={() => onRemoveFavorite(player.id)}>
            <Trash2 size={16} /> Remove
          </Button>
        ) : null}
      </div>
    </Card>
  );
};
