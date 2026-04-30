export const MetricPill = ({ label, value }: { label: string; value: string }) => (
  <div className="metric-pill">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);
