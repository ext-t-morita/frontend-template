import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildTokenCssVariables,
  type TokenSource,
} from "../src/buildCssVariables.ts";

const tokenJsonPath = resolve(import.meta.dirname, "../src/index.json");
const tokenSource = JSON.parse(
  readFileSync(tokenJsonPath, "utf8"),
) as TokenSource;
const tokenCssVariables = buildTokenCssVariables(tokenSource);

const outputPath = resolve(import.meta.dirname, "../dist/tokens.css");

mkdirSync(resolve(import.meta.dirname, "../dist"), { recursive: true });
writeFileSync(outputPath, tokenCssVariables, "utf8");
