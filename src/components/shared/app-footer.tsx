const APP_VERSION = import.meta.env.VITE_APP_VERSION || "dev";

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="surface-card border-t-stroke shrink-0"
      style={{
        borderColor:
          "color-mix(in srgb, var(--sidebar-border) 55%, var(--border-transparent))",
      }}
    >
      <div
        className={[
          "min-h-10 sm:min-h-11 md:min-h-12 lg:min-h-12 xl:min-h-14 2xl:min-h-14 3xl:min-h-16",
          "4xl:min-h-16 5xl:min-h-20 6xl:min-h-20 7xl:min-h-24 8xl:min-h-24",
          "px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24",
          "5xl:px-32 6xl:px-40 7xl:px-48 8xl:px-56",
          "flex flex-col",
          "t-body-md text-soft",
          "md:flex-row md:items-center md:justify-between",
        ].join(" ")}
      >
        <div className={[
          "hidden md:flex shrink-0 items-center",
          "md:w-40 lg:w-44 xl:w-48 2xl:w-56 3xl:w-64 4xl:w-72 5xl:w-80 6xl:w-96 7xl:w-96 8xl:w-96",
        ].join(" ")}>
          <span>Version {APP_VERSION}</span>
        </div>
        <div className="flex flex-1 items-center justify-center min-h-10 sm:min-h-11 md:min-h-0">
          <span className="truncate">© {year} Installments. All rights reserved.</span>
        </div>
        <div className={[
          "hidden md:flex shrink-0 justify-end items-center",
          "md:w-40 lg:w-44 xl:w-48 2xl:w-56 3xl:w-64 4xl:w-72 5xl:w-80 6xl:w-96 7xl:w-96 8xl:w-96",
        ].join(" ")}>
          <div />
        </div>
      </div>
    </footer>
  );
}
