type TabItem = { value: string; label: string };

export function TabSelect({
  tabs,
  value,
  onValueChange,
  children,
}: {
  tabs: TabItem[];
  value: string;
  onValueChange: (value: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <div>
      <div role="tablist" className="flex border-b border-default">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={value === t.value}
            onClick={() => onValueChange(t.value)}
            className={`py-3 px-5 t-meta-bold tab-trigger border-b-2 ${
              value === t.value
                ? "border-brand surface-card"
                : "border-transparent"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {children}
    </div>
  );
}

export function TabPanel({
  value,
  active,
  className,
  children,
}: {
  value: string;
  active: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (value !== active) return null;
  return <div className={className}>{children}</div>;
}
