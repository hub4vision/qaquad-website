import { test, expect } from "@playwright/test";
import { p0Pages } from "./utils";

test.describe("Primary CTA buttons", () => {
  for (const { path, name } of p0Pages) {
    test(`"${name}" page has at least one working CTA to /contact`, async ({ page, isMobile }) => {
      await page.goto(path);
      const ctaLinks = page.getByRole("link", { name: /Book a Free QA Assessment/i });
      const isCtaVisible = await ctaLinks.first().isVisible().catch(() => false);
      if (!isCtaVisible && isMobile) {
        const openMenu = page.getByRole("button", { name: "Open menu" });
        if (await openMenu.isVisible()) {
          await openMenu.click();
        }
      }

      await expect(ctaLinks.first()).toBeVisible();

      const hrefs = await ctaLinks.evaluateAll((links) => links.map((link) => link.getAttribute("href")));
      expect(hrefs.every((href) => href === "/contact")).toBe(true);
    });
  }

  test('secondary CTA "See How It Works" navigates correctly from the homepage', async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "See How It Works" }).click();
    await expect(page).toHaveURL(/\/how-it-works/);
  });
});
