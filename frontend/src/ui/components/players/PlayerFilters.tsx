import { PlayerQuery, Position } from '@/shared/types/domain';
import { Input } from '@/ui/components/common/Input';
import { Select } from '@/ui/components/common/Select';

interface Props {
  value: PlayerQuery;
  positions: readonly Position[];
  onChange: (next: PlayerQuery) => void;
}

export const PlayerFilters = ({ value, positions, onChange }: Props) => (
  <section className="filters-grid">
    <Input
      label="Search player"
      value={value.name}
      onChange={(event) => onChange({ ...value, name: event.target.value })}
      placeholder="Search by name"
    />
    <Select
      label="Position"
      value={value.position}
      onChange={(event) =>
        onChange({ ...value, position: event.target.value as Position | 'ALL' })
      }
    >
      <option value="ALL">All positions</option>
      {positions.map((position) => (
        <option key={position} value={position}>
          {position}
        </option>
      ))}
    </Select>
    <Input
      label="Nationality"
      value={value.nationality}
      onChange={(event) =>
        onChange({ ...value, nationality: event.target.value })
      }
      placeholder="Country"
    />
    <div className="filters-grid__ages">
      <Input
        label="Min age"
        type="number"
        value={value.minAge}
        onChange={(event) => onChange({ ...value, minAge: event.target.value })}
      />
      <Input
        label="Max age"
        type="number"
        value={value.maxAge}
        onChange={(event) => onChange({ ...value, maxAge: event.target.value })}
      />
    </div>
  </section>
);
