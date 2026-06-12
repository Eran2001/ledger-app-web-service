const APP_VERSION = import.meta.env.VITE_APP_VERSION || "dev";

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-card border-t border-default shrink-0">
      <div className="min-h-14 px-4 sm:px-6 py-3 flex flex-col gap-2 t-meta text-soft sm:min-h-16 sm:flex-row sm:items-center sm:justify-between">
        <div className="sm:flex-1">
          <span className="mono-text">Version {APP_VERSION}</span>
        </div>
        <div className="text-center sm:flex-1">
          <span>Copyright © {year} Silva Traders. All rights reserved.</span>
        </div>
        <div className="sm:flex-1 sm:flex sm:justify-end">
          <div />
        </div>
      </div>
    </footer>
  );
}
