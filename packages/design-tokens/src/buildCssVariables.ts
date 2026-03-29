import type tokenData from "./index.json";

export type TokenSource = typeof tokenData;
type TokenTree = {
  [key: string]: string | TokenTree;
};

type TokenValue = string | TokenTree;

const isReference = (value: string) =>
  value.startsWith("{") && value.endsWith("}");

const getTokenValue = (source: TokenSource, path: string[]) => {
  let current: TokenValue = source;

  for (const segment of path) {
    if (
      typeof current !== "object" ||
      current === null ||
      !(segment in current)
    ) {
      throw new Error(`Unknown token reference: ${path.join(".")}`);
    }

    current = current[segment];
  }

  if (typeof current !== "string") {
    throw new Error(
      `Token reference does not resolve to a string: ${path.join(".")}`,
    );
  }

  return current;
};

const resolveTokenValue = (
  source: TokenSource,
  value: string,
  stack = new Set<string>(),
): string => {
  if (!isReference(value)) {
    return value;
  }

  const reference = value.slice(1, -1);

  if (stack.has(reference)) {
    throw new Error(`Circular token reference: ${reference}`);
  }

  const nextStack = new Set(stack);
  nextStack.add(reference);

  return resolveTokenValue(
    source,
    getTokenValue(source, reference.split(".")),
    nextStack,
  );
};

const toCssLines = (
  prefix: string,
  tokens: Record<string, string>,
  source: TokenSource,
) =>
  Object.entries(tokens).map(([name, value]) => {
    const cssName = name.replaceAll(".", "-");

    return `  --${prefix}-${cssName}: ${resolveTokenValue(source, value)};`;
  });

const buildThemeBlock = (
  selector: string,
  overrides: Partial<{
    color: Record<string, string>;
    radius: Record<string, string>;
    shadow: Record<string, string>;
    typography: Record<string, string>;
  }>,
  source: TokenSource,
) => {
  const lines = [
    ...toCssLines("color", overrides.color ?? source.semantic.color, source),
    ...toCssLines("radius", overrides.radius ?? source.semantic.radius, source),
    ...toCssLines("shadow", overrides.shadow ?? source.semantic.shadow, source),
    ...toCssLines(
      "font",
      overrides.typography ?? source.semantic.typography,
      source,
    ),
  ];

  return `${selector} {\n${lines.join("\n")}\n}`;
};

export const buildTokenCssVariables = (source: TokenSource) => {
  const themeBlocks = Object.entries(source.themes).map(([themeName, theme]) =>
    buildThemeBlock(`[data-theme="${themeName}"]`, theme, source),
  );

  const defaultTheme = source.themes.light ?? {
    color: source.semantic.color,
  };

  return [
    buildThemeBlock(":root", defaultTheme, source),
    ...themeBlocks,
    "",
  ].join("\n\n");
};
