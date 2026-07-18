export const Stat = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="t-label-sm-bold text-faint text-uppercase tracking-label mb-1">
        {label}
      </p>
      <p className="t-body-md-bold text-main">{value}</p>
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
    <span className="t-body-md text-soft">
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
      <span className="t-label-sm-bold text-faint text-uppercase tracking-label self-baseline">
        {label}:
      </span>
      <span className="t-body-md-bold text-main">{value}</span>
    </div>
  );
};
