import tokenData from "./index.json";
import { buildTokenCssVariables } from "./buildCssVariables";

export const tokens = tokenData;
export const tokenCssVariables = buildTokenCssVariables(tokens);
