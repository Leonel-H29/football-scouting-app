import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CompareResult } from '@/shared/types/domain';
import { Card } from '@/ui/components/common/Card';

const chartKeys = ['goals', 'assists', 'minutesPlayed', 'shotsOnTarget', 'keyPasses', 'tackles'];
const colors = ['#00E094', '#0C65D4', '#7533FC'];

export const ComparisonRadar = ({ data }: { data: CompareResult }) => {
  const chartData = data.rows
    .filter((row) => chartKeys.includes(row.key))
    .map((row) => {
      const values: Record<string, number> = {};
      for (const value of row.values) {
        values[value.playerName] = typeof value.value === 'number' ? value.value : 0;
      }
      return { ...values, metric: row.label };
    });

  const playerNames = data.players.map((player) => player.name);

  return (
    <Card className="comparison-chart">
      <h3>Radar comparison</h3>
      <div className="comparison-chart__body">
        <ResponsiveContainer width="100%" height={360}>
          <RadarChart data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <Tooltip />
            {playerNames.map((name, index) => (
              <Radar key={name} name={name} dataKey={name} stroke={colors[index % colors.length]} fill={colors[index % colors.length]} fillOpacity={0.15} />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
