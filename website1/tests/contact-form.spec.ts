import { test, expect } from "@playwright/test";
import { validContactSubmission } from "./utils";

test.describe("Contact form", () => {
  test("shows validation errors on empty submit and does not call the API", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/contact", async (route) => {
      apiCalled = true;
      await route.continue();
    });

    await page.goto("/contact");
    await page.getByRole("button", { name: "Request Free QA Assessment" }).click();

    await expect(page.getByText("Please enter your full name.")).toBeVisible();
    await expect(page.getByText("Please enter your company name.")).toBeVisible();
    await expect(page.getByText("Please enter your work email.")).toBeVisible();
    expect(apiCalled).toBe(false);
  });

  test("shows an inline error for an invalid email format", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("Full name").fill(validContactSubmission.name);
    await page.locator("#company").fill(validContactSubmission.company);
    await page.getByLabel("Business email").fill("not-an-email");
    await page.getByLabel("Message").fill(validContactSubmission.message);

    await page.getByRole("button", { name: "Request Free QA Assessment" }).click();
    await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  });

  test("submits successfully with valid data and shows the thank-you state", async ({ page }) => {
    await page.goto("/contact");

    await page.getByLabel("Full name").fill(validContactSubmission.name);
    await page.locator("#company").fill(validContactSubmission.company);
    await page.getByLabel("Business email").fill(validContactSubmission.email);
    await page.getByLabel("Message").fill(validContactSubmission.message);
    // Leave the select fields at their defaults — all have a valid default value.

    await page.getByRole("button", { name: "Request Free QA Assessment" }).click();

    await expect(page.getByRole("heading", { name: "Thank you." })).toBeVisible();
    await expect(page.getByText("We will review your requirement and contact you shortly.")).toBeVisible();
  });

  test("honeypot field is present but hidden from view", async ({ page }) => {
    await page.goto("/contact");
    const honeypot = page.locator("#website");
    await expect(honeypot).toBeAttached();
    const box = await honeypot.boundingBox();
    expect(box?.x ?? 0).toBeLessThan(0);
  });
});
