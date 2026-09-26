import sys
import time
from playwright.sync_api import sync_playwright

def run():
    print("Starting exploration of Bookings menu...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        page.goto("http://mus-bo.eye4travel.com/auth/login", timeout=45000, wait_until="networkidle")

        # Fill Company Code
        page.locator("input[placeholder*='Company' i]").fill("MUS")
        page.locator("input[placeholder*='User' i]").fill("admin")
        page.locator("input[type='password']").fill("admin@MUS@")

        # Click Send OTP
        page.locator("button:has-text('Send OTP')").click()
        time.sleep(3)

        # Click OK on OTP sent dialog
        ok_btn = page.locator("button:has-text('OK'), button:has-text('Ok'), .swal2-confirm")
        if ok_btn.count() > 0 and ok_btn.first.is_visible():
            ok_btn.first.click()
            time.sleep(1)

        # Fill OTP
        page.locator("input[placeholder*='OTP' i]").fill("xH9e1KxzFAPlAJ5")

        # Click Verify & Login
        page.locator("button:has-text('Verify & Login')").click()
        time.sleep(3)

        # Click OK on Success dialog
        ok_dialog = page.locator("button:has-text('OK'), button:has-text('Ok'), .swal2-confirm")
        if ok_dialog.count() > 0 and ok_dialog.first.is_visible():
            print("Clicking OK on Login successful dialog...")
            ok_dialog.first.click()
            time.sleep(2)

        print(f"Current URL: {page.url}")
        page.screenshot(path="d:/Testing/Website/website1/dashboard.png")

        # Look for Bookings menu item in sidebar
        print("Looking for Bookings in menu...")
        bookings_item = page.locator("text='Bookings'").first
        print(f"Bookings locator visible: {bookings_item.is_visible()}")

        # Click Bookings to expand
        bookings_item.click()
        time.sleep(2)

        page.screenshot(path="d:/Testing/Website/website1/bookings_expanded.png")

        # Extract all submenus / links under Bookings or in sidebar
        # Let's inspect the DOM of the sidebar
        sidebar_links = page.eval_on_selector_all(
            "aside, nav, .sidebar, .vertical-menu, [class*='sidebar'], [class*='menu']",
            """elements => {
                return elements.map(el => el.innerHTML);
            }"""
        )
        print(f"Found {len(sidebar_links)} menu containers.")

        # Let's find all items/links near or inside the opened menu
        submenus = page.evaluate("""() => {
            const results = [];
            // Look for all links, list items, or buttons under sidebar
            const links = document.querySelectorAll('a, li, .nav-item, .sub-menu a');
            links.forEach(el => {
                const text = el.innerText.trim();
                const href = el.getAttribute('href');
                const tag = el.tagName;
                const cls = el.className;
                if (text) {
                    results.push({ text, href, tag, cls });
                }
            });
            return results;
        }""")

        print(f"Total elements with text found: {len(submenus)}")
        for item in submenus:
            print(f"[{item['tag']}] text: '{item['text']}' | href: {item['href']} | class: {item['cls']}")

        browser.close()

if __name__ == "__main__":
    run()
