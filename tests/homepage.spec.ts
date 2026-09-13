import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title, hero, and no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    const response = await page.goto("/");
    expect(response?.status()).toBeLessThan(400);

    await expect(page).toHaveTitle(/AI-Powered QA Automation/i);

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      /AI-Powered QA Automation for Faster, More Reliable Software Releases/i,
    );

    // Primary CTA is present and points to /contact.
    const heroCta = page.getByRole("link", { name: "Book a Free QA Assessment" }).first();
    await expect(heroCta).toBeVisible();
    await expect(heroCta).toHaveAttribute("href", "/contact");

    expect(consoleErrors, `Unexpected console errors: ${consoleErrors.join("\n")}`).toEqual([]);
  });

  test("renders the major homepage sections", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: /Traditional QA can't keep up/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /From Application URL to Evidence-Backed QA/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Migration testing that compares behavior/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Services built for engineering-led QA/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Every important finding has evidence/i })).toBeVisible();
  });

  test("has essential SEO metadata", async ({ page }) => {
    await page.goto("/");

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.length ?? 0).toBeGreaterThan(20);

    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical).toBeTruthy();

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute("content");
    expect(ogTitle?.length ?? 0).toBeGreaterThan(0);
  });
});
