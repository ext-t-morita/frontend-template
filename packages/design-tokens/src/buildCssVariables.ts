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

export const buildTokenCssVariables = (source: TokenSource) => {
  const colorTokens = source.themes.dark.color ?? source.semantic.color;

  const lines = [
    ...toCssLines("color", colorTokens, source),
    ...toCssLines("radius", source.semantic.radius, source),
    ...toCssLines("shadow", source.semantic.shadow, source),
    ...toCssLines("font", source.semantic.typography, source),
  ];

  return `:root {\n${lines.join("\n")}\n}\n`;
};
