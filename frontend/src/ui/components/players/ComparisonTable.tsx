import { CompareResult } from '@/shared/types/domain';
import { Card } from '@/ui/components/common/Card';
import { formatInteger } from '@/shared/utils/format';

export const ComparisonTable = ({ data }: { data: CompareResult }) => (
  <Card>
    <div className="card__header">
      <h3>Comparison table</h3>
      <span>{data.season ? data.season.name : 'Latest season'}</span>
    </div>
    <div className="table-wrap">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Metric</th>
            {data.players.map((player) => <th key={player.id}>{player.name}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.key}>
              <td>{row.label}</td>
              {row.values.map((value) => (
                <td key={value.playerId}>
                  {typeof value.value === 'number' ? formatInteger(value.value) : value.value ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
);
