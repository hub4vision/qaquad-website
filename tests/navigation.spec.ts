import { test, expect } from "@playwright/test";

test.describe("Desktop navigation", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("every primary nav link navigates to the correct page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });

    const expectations: [string, RegExp][] = [
      ["Services", /\/ai-qa-automation/],
      ["AI-QA Tool", /\/ai-qa-tool/],
      ["Migration Testing", /\/migration-testing/],
      ["How It Works", /\/how-it-works/],
      ["Industries", /\/industries/],
      ["About", /\/about/],
      ["Contact", /\/contact/],
    ];

    for (const [label, urlPattern] of expectations) {
      await page.goto("/");
      await nav.getByRole("link", { name: label, exact: label === "Services" }).click();
      await expect(page).toHaveURL(urlPattern);
    }
  });

  test("services mega menu opens on hover and contains predictive analysis link", async ({ page }) => {
    await page.goto("/");
    const servicesTrigger = page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Services" });
    await servicesTrigger.hover();
    const predictiveLink = page.getByRole("link", { name: "Predictive Analysis" });
    await expect(predictiveLink).toBeVisible();
  });

  test("header CTA is visible and links to contact", async ({ page }) => {
    await page.goto("/");
    const headerCta = page.getByRole("banner").getByRole("link", { name: "Book a Free QA Assessment" });
    await expect(headerCta).toBeVisible();
    await headerCta.click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
