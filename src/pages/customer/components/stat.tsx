export const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="t-micro-bold text-faint text-uppercase tracking-label mb-1">
        {label}
      </p>
      <p className="t-meta-bold text-main">{value}</p>
    </div>
  );
};
