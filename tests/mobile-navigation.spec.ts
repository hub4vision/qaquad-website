import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 } });

test.describe("Mobile navigation", () => {
  test("hamburger menu opens, lists links, and navigates", async ({ page }) => {
    await page.goto("/");

    // Desktop nav should be hidden at mobile width.
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await expect(menuButton).toBeVisible();
    await menuButton.click();

    const mobilePanel = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(mobilePanel).toBeVisible();

    await mobilePanel.getByRole("link", { name: "How It Works" }).click();
    await expect(page).toHaveURL(/\/how-it-works/);

    // Menu should be closed after navigating.
    await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeHidden();
  });

  test("menu closes via the close button", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeVisible();

    await page.getByRole("button", { name: "Close menu" }).click();
    await expect(page.getByRole("dialog", { name: "Mobile navigation" })).toBeHidden();
  });

  test("mobile menu CTA links to contact", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const mobilePanel = page.getByRole("dialog", { name: "Mobile navigation" });
    await mobilePanel.getByRole("link", { name: "Book a Free QA Assessment" }).click();
    await expect(page).toHaveURL(/\/contact/);
  });

  test("all mobile links are visible and panel is full-height", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const mobilePanel = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(mobilePanel).toBeVisible();

    // Verify all primary nav links are visible
    for (const label of ["Services", "Migration Testing", "How It Works", "Industries", "About", "Contact"]) {
      await expect(mobilePanel.getByRole("link", { name: label, exact: true })).toBeVisible();
    }

    // Verify dialog height is full height (not squeezed by containing block bug)
    const box = await mobilePanel.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.height).toBeGreaterThan(400);
  });
});
