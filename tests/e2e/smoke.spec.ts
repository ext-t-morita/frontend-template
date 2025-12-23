import { expect, type Page, test } from "@playwright/test";

const baseURL = process.env.BASE_URL;

test.skip(!baseURL, "Set BASE_URL (e.g. http://localhost:3000) to run the smoke e2e");

test("home page loads", async ({ page }: { page: Page }) => {
  if (!baseURL) return;
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/User Provisioning|Next/);
});
