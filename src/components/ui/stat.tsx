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

export const StatMeta = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <span className="t-meta text-soft">
      <span className="text-faint">{label}: </span>
      <span>{value}</span>
    </span>
  );
};

export const StatInline = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="contents">
      <span className="t-micro-bold text-faint text-uppercase tracking-label self-baseline">
        {label}:
      </span>
      <span className="t-meta-bold text-main">{value}</span>
    </div>
  );
};
