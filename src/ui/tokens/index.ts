export type Palette = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  inputBackground: string;
  switchBackground: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
};

export type Radii = {
  radius: string;
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
};

export type Typography = {
  fontFamilySans: readonly string[];
  fontFamilySerif: readonly string[];
  fontFamilySansCss: string;
  fontFamilySerifCss: string;
  fontSize: string;
  textBase: string;
  textLg: string;
  textXl: string;
  text2xl: string;
  weightNormal: number;
  weightMedium: number;
  weightSemibold: number;
};

export type Tokens = {
  light: Palette;
  dark: Palette;
  radii: Radii;
  typography: Typography;
};

const paletteLight: Palette = {
  background: "#fafbfc",
  foreground: "#0f172a",
  card: "#ffffff",
  cardForeground: "#0f172a",
  popover: "#ffffff",
  popoverForeground: "#0f172a",
  primary: "#4f46e5",
  primaryForeground: "#ffffff",
  secondary: "#f1f5f9",
  secondaryForeground: "#0f172a",
  muted: "#f1f5f9",
  mutedForeground: "#64748b",
  accent: "#f8fafc",
  accentForeground: "#0f172a",
  destructive: "#ef4444",
  destructiveForeground: "#ffffff",
  border: "#e2e8f0",
  input: "transparent",
  inputBackground: "#f8fafc",
  switchBackground: "#cbd5e1",
  ring: "rgba(79, 70, 229, 0.2)",
  chart1: "#4f46e5",
  chart2: "#06b6d4",
  chart3: "#8b5cf6",
  chart4: "#f59e0b",
  chart5: "#10b981",
  sidebar: "#ffffff",
  sidebarForeground: "#0f172a",
  sidebarPrimary: "#4f46e5",
  sidebarPrimaryForeground: "#ffffff",
  sidebarAccent: "#f8fafc",
  sidebarAccentForeground: "#0f172a",
  sidebarBorder: "#e2e8f0",
  sidebarRing: "rgba(79, 70, 229, 0.2)",
};

const paletteDark: Palette = {
  background: "#0f172a",
  foreground: "#f1f5f9",
  card: "#1e293b",
  cardForeground: "#f1f5f9",
  popover: "#1e293b",
  popoverForeground: "#f1f5f9",
  primary: "#6366f1",
  primaryForeground: "#ffffff",
  secondary: "#1e293b",
  secondaryForeground: "#f1f5f9",
  muted: "#1e293b",
  mutedForeground: "#94a3b8",
  accent: "#334155",
  accentForeground: "#f1f5f9",
  destructive: "#f87171",
  destructiveForeground: "#ffffff",
  border: "#334155",
  input: "#334155",
  inputBackground: "#1e293b",
  switchBackground: "#475569",
  ring: "rgba(99, 102, 241, 0.3)",
  chart1: "#6366f1",
  chart2: "#22d3ee",
  chart3: "#a78bfa",
  chart4: "#fbbf24",
  chart5: "#34d399",
  sidebar: "#1e293b",
  sidebarForeground: "#f1f5f9",
  sidebarPrimary: "#6366f1",
  sidebarPrimaryForeground: "#ffffff",
  sidebarAccent: "#334155",
  sidebarAccentForeground: "#f1f5f9",
  sidebarBorder: "#334155",
  sidebarRing: "rgba(99, 102, 241, 0.3)",
};

const radii: Radii = {
  radius: "0.75rem",
  radiusSm: "calc(0.75rem - 4px)",
  radiusMd: "calc(0.75rem - 2px)",
  radiusLg: "0.75rem",
  radiusXl: "calc(0.75rem + 4px)",
};

const typography: Typography = {
  fontFamilySans: [
    "Inter",
    "Noto Sans JP",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "sans-serif",
  ] as const,
  fontFamilySerif: [
    "Noto Serif JP",
    "Noto Sans JP",
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "serif",
  ] as const,
  fontFamilySansCss:
    "Inter, 'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontFamilySerifCss:
    "'Noto Serif JP', 'Noto Sans JP', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', serif",
  fontSize: "16px",
  textBase: "1rem",
  textLg: "1.125rem",
  textXl: "1.25rem",
  text2xl: "1.5rem",
  weightNormal: 400,
  weightMedium: 500,
  weightSemibold: 600,
};

export const tokens: Tokens = {
  light: paletteLight,
  dark: paletteDark,
  radii,
  typography,
};

export default tokens;

type Flattenable = Record<string, string | number | Record<string, unknown>>;

const toKebab = (value: string) =>
  value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Za-z])([0-9]+)/g, "$1-$2")
    .toLowerCase();

const flatten = (prefix: string, obj: Flattenable, out: Record<string, string>) => {
  Object.entries(obj).forEach(([key, value]) => {
    const nextKey = prefix ? `${prefix}-${toKebab(key)}` : toKebab(key);
    if (typeof value === "object" && value !== null) {
      flatten(nextKey, value as Flattenable, out);
    } else {
      out[nextKey] = String(value);
    }
  });
};

/**
 * 現行 CSS トークン (`variables.css`) に合わせた CSS カスタムプロパティのマップを生成。
 * 例: background -> #fafbfc, radius-sm -> calc(0.75rem - 4px)
 */
export const buildCssVariableMap = (mode: "light" | "dark" = "light") => {
  const vars: Record<string, string> = {};
  const palette = mode === "dark" ? tokens.dark : tokens.light;

  // colors / layout
  flatten("", palette, vars);

  // radius
  flatten("", tokens.radii, vars);

  // typography scale
  flatten(
    "",
    {
      fontFamilySans: tokens.typography.fontFamilySansCss,
      fontFamilySerif: tokens.typography.fontFamilySerifCss,
      fontSize: tokens.typography.fontSize,
      textBase: tokens.typography.textBase,
      textLg: tokens.typography.textLg,
      textXl: tokens.typography.textXl,
      text2xl: tokens.typography.text2xl,
      fontWeightNormal: tokens.typography.weightNormal,
      fontWeightMedium: tokens.typography.weightMedium,
      fontWeightSemibold: tokens.typography.weightSemibold,
    },
    vars,
  );

  return vars;
};
