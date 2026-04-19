import type { StylesConfig } from "react-select";

interface ReactSelectStylesOptions {
  hasError?: boolean;
}

export function reactSelectStyles<T>(
  options: ReactSelectStylesOptions = {}
): StylesConfig<T> {
  const { hasError = false } = options;

  return {
    control: (base, state) => ({
      ...base,
      minHeight: "48px",
      borderRadius: "calc(var(--radius) - 2px)",
      borderColor: hasError
        ? "hsl(var(--destructive))"
        : state.isFocused
          ? "hsl(var(--primary))"
          : "hsl(var(--input))",
      boxShadow: "none",
      backgroundColor: "hsl(var(--background))",
      "&:hover": {
        borderColor: hasError
          ? "hsl(var(--destructive))"
          : state.isFocused
            ? "hsl(var(--primary))"
            : "hsl(var(--input))",
      },
      cursor: "pointer",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0 12px",
    }),

    singleValue: (base) => ({
      ...base,
      color: "hsl(var(--foreground))",
      fontSize: "0.875rem",
    }),

    placeholder: (base) => ({
      ...base,
      color: "hsl(var(--muted-foreground))",
      fontSize: "0.875rem",
    }),

    input: (base) => ({
      ...base,
      color: "hsl(var(--foreground))",
      fontSize: "0.875rem",
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "hsl(var(--popover))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "calc(var(--radius) - 2px)",
      boxShadow: "var(--shadow-md)",
      zIndex: 50,
    }),

    menuList: (base) => ({
      ...base,
      padding: "4px",
    }),

    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? "hsl(var(--accent))"
        : "transparent",
      color: state.isFocused
        ? "hsl(var(--accent-foreground))"
        : "hsl(var(--foreground))",
      fontSize: "0.875rem",
      borderRadius: "calc(var(--radius) - 4px)",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "hsl(var(--accent))",
      },
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),

    dropdownIndicator: (base) => ({
      ...base,
      color: "hsl(var(--foreground))",
      padding: "0 8px",
      opacity: 0.3,
      transform: "scale(0.80)",
      "&:hover": {
        color: "hsl(var(--foreground))",
      },
    }),

    clearIndicator: (base) => ({
      ...base,
      color: "hsl(var(--muted-foreground))",
      "&:hover": {
        color: "hsl(var(--foreground))",
      },
    }),
  };
}