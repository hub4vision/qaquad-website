import { test, expect } from "@playwright/test";

test.describe("Service pages", () => {
  test("AI QA Automation page loads with expected content", async ({ page }) => {
    const response = await page.goto("/ai-qa-automation");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/AI Functional Testing/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Application discovery, requirements/i);
  });

  test("Migration Testing page loads with expected content", async ({ page }) => {
    const response = await page.goto("/migration-testing");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Legacy-to-New Application Migration Testing/i);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(/Migrate Your Application/i);
    await expect(page.getByText("PASS").first()).toBeVisible();
    await expect(page.getByText(/Demo \/ Illustrative example/i)).toBeVisible();
  });

  test("Test Automation page loads and anchors resolve", async ({ page }) => {
    const response = await page.goto("/test-automation");
    expect(response?.status()).toBeLessThan(400);
    await expect(page.locator("#api-testing")).toBeVisible();
    await expect(page.locator("#database-validation")).toBeVisible();
  });

  test("service cards on the homepage link to working service pages", async ({ page }) => {
    await page.goto("/");
    const learnMoreLinks = page.getByRole("link", { name: "Learn more" });
    const count = await learnMoreLinks.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i += 1) {
      const href = await learnMoreLinks.nth(i).getAttribute("href");
      expect(href).toBeTruthy();
      if (!href) continue;
      const response = await page.request.get(href);
      expect(response.status(), `Service link ${href} should resolve`).toBeLessThan(400);
    }
  });
});
