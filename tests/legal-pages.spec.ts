import { test, expect } from "@playwright/test";

test.describe("Legal pages", () => {
  test("Privacy Policy page loads with expected content", async ({ page }) => {
    const response = await page.goto("/privacy");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Privacy Policy/i);
    await expect(page.getByRole("heading", { name: "Privacy Policy", level: 1 })).toBeVisible();
    await expect(page.getByText(/not legal advice/i)).toBeVisible();
  });

  test("Terms page loads with expected content", async ({ page }) => {
    const response = await page.goto("/terms");
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/Terms of Service/i);
    await expect(page.getByRole("heading", { name: "Terms of Service", level: 1 })).toBeVisible();
    await expect(page.getByText(/not legal advice/i)).toBeVisible();
  });

  test("footer links to both legal pages", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute("href", "/privacy");
    await expect(footer.getByRole("link", { name: "Terms of Service" })).toHaveAttribute("href", "/terms");
  });
});
