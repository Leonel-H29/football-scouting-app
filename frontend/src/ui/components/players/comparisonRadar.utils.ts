import { CompareResult } from '@/shared/types/domain';

export interface RadarSeries {
  playerId: string;
  playerName: string;
  color: string;
}

export interface RadarChartDatum {
  metric: string;
  [playerId: string]: string | number;
}

const radarPalette = ['#00E094', '#0C65D4', '#7533FC'];

const toNumericValue = (value: number | string | null): number => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

export const buildComparisonRadarData = (data: CompareResult): {
  chartData: RadarChartDatum[];
  series: RadarSeries[];
} => {
  const series = data.players.map((player, index) => ({
    playerId: player.id,
    playerName: player.name,
    color: radarPalette[index % radarPalette.length],
  }));

  const chartData = data.rows.map((row) => {
    const rowValues = row.values.map((value) => toNumericValue(value.value));
    const rowMax = rowValues.reduce((max, value) => Math.max(max, value), 0);

    const entry: RadarChartDatum = { metric: row.label };
    for (const value of row.values) {
      const normalizedValue = rowMax > 0 ? (toNumericValue(value.value) / rowMax) * 100 : 0;
      entry[value.playerId] = Number(normalizedValue.toFixed(2));
    }
    return entry;
  });

  return { chartData, series };
};
