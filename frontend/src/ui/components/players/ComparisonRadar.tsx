import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CompareResult } from '@/shared/types/domain';
import { Card } from '@/ui/components/common/Card';
import { buildComparisonRadarData } from '@/ui/components/players/comparisonRadar.utils';

export const ComparisonRadar = ({ data }: { data: CompareResult }) => {
  const { chartData, series } = buildComparisonRadarData(data);

  return (
    <Card className="comparison-chart">
      <div className="card__header">
        <h3>Radar comparison</h3>
        <span>{data.season ? data.season.name : 'Latest season'}</span>
      </div>
      <div className="comparison-chart__legend" aria-label="Radar legend">
        {series.map((item) => (
          <div key={item.playerId} className="comparison-chart__legend-item">
            <span className="comparison-chart__legend-swatch" style={{ backgroundColor: item.color }} />
            <span>{item.playerName}</span>
          </div>
        ))}
      </div>
      <div className="comparison-chart__body">
        <ResponsiveContainer width="100%" height={380}>
          <RadarChart data={chartData} margin={{ top: 16, right: 16, bottom: 16, left: 16 }}>
            <PolarGrid gridType="polygon" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--muted)', fontSize: 12 }} />
            <Tooltip formatter={(value: number | string) => `${typeof value === 'number' ? value.toFixed(0) : value} / 100`} />
            {series.map((item) => (
              <Radar
                key={item.playerId}
                name={item.playerName}
                dataKey={item.playerId}
                stroke={item.color}
                fill={item.color}
                fillOpacity={0.22}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
