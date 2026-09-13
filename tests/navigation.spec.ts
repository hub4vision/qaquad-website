import { test, expect } from "@playwright/test";

test.describe("Desktop navigation", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("every primary nav link navigates to the correct page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    const expectations: [string, RegExp][] = [
      ["Services", /\/ai-qa-automation/],
      ["Migration Testing", /\/migration-testing/],
      ["How It Works", /\/how-it-works/],
      ["Industries", /\/industries/],
      ["About", /\/about/],
      ["Contact", /\/contact/],
    ];

    for (const [label, urlPattern] of expectations) {
      await nav.getByRole("link", { name: label }).click();
      await expect(page).toHaveURL(urlPattern);
      await page.goBack();
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("header CTA is visible and links to contact", async ({ page }) => {
    await page.goto("/");
    const headerCta = page.getByRole("banner").getByRole("link", { name: "Book a Free QA Assessment" });
    await expect(headerCta).toBeVisible();
    await headerCta.click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
