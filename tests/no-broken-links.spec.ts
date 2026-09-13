import { test, expect } from "@playwright/test";
import { allInternalPages } from "./utils";

test.describe("Site-wide link integrity", () => {
  test("every P0/P1/P2 route resolves without a client error", async ({ page }) => {
    for (const { path, name } of allInternalPages) {
      const response = await page.goto(path);
      expect(response?.status(), `${name} (${path}) should not error`).toBeLessThan(400);
    }
  });

  test("no internal link on the homepage or footer points to a broken route", async ({ page }) => {
    await page.goto("/");

    const hrefs = await page.locator("a[href]").evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href") || "")
        .filter((href) => href.startsWith("/") && !href.startsWith("//")),
    );

    const uniqueHrefs = Array.from(new Set(hrefs.map((href) => href.split("#")[0]))).filter(Boolean);

    for (const href of uniqueHrefs) {
      const response = await page.request.get(href);
      expect(response.status(), `Internal link ${href} should resolve`).toBeLessThan(400);
    }
  });

  test("sitemap.xml and robots.txt are served", async ({ page }) => {
    const sitemapResponse = await page.request.get("/sitemap.xml");
    expect(sitemapResponse.status()).toBe(200);
    const sitemapBody = await sitemapResponse.text();
    expect(sitemapBody).toContain("<urlset");

    const robotsResponse = await page.request.get("/robots.txt");
    expect(robotsResponse.status()).toBe(200);
    const robotsBody = await robotsResponse.text();
    expect(robotsBody.toLowerCase()).toContain("sitemap");
  });
});
