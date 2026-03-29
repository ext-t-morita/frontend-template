import { expect, test } from "@playwright/test";

test("homepage renders the workspace scaffold", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Commercial-grade UI workspace" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Open implementation brief" }),
  ).toBeVisible();
  await expect(page.getByText("Ava Cole")).toBeVisible();
});
