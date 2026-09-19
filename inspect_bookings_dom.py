import json
from playwright.sync_api import sync_playwright

def inspect_bookings_dom():
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
        page.wait_for_timeout(3000)

        ok_btn = page.locator("button:has-text('OK'), button:has-text('Ok'), .swal2-confirm")
        if ok_btn.count() > 0 and ok_btn.first.is_visible():
            ok_btn.first.click()
            page.wait_for_timeout(1000)

        # Fill OTP
        page.locator("input[placeholder*='OTP' i]").fill("xH9e1KxzFAPlAJ5")
        page.locator("button:has-text('Verify & Login')").click()
        page.wait_for_timeout(3000)

        ok_dialog = page.locator("button:has-text('OK'), button:has-text('Ok'), .swal2-confirm")
        if ok_dialog.count() > 0 and ok_dialog.first.is_visible():
            ok_dialog.first.click()
            page.wait_for_timeout(2000)

        # Expand Bookings
        page.locator("text='Bookings'").first.click()
        page.wait_for_timeout(1500)

        # Inspect the container of Bookings
        result = page.evaluate("""() => {
            // Find Bookings link or button
            const elements = Array.from(document.querySelectorAll('a, button, div, li'));
            const bookingsEl = elements.find(el => el.innerText && el.innerText.trim() === 'Bookings' && (el.getAttribute('href') || el.onclick || el.getAttribute('data-bs-toggle') || el.getAttribute('aria-controls')));
            
            // Find the collapse target or adjacent sibling container
            let collapseId = '';
            if (bookingsEl) {
                collapseId = bookingsEl.getAttribute('href') || bookingsEl.getAttribute('data-bs-target') || '';
            }

            let subItems = [];
            if (collapseId && collapseId.startsWith('#')) {
                const container = document.querySelector(collapseId);
                if (container) {
                    const links = container.querySelectorAll('a');
                    links.forEach(l => {
                        subItems.push({
                            title: l.innerText.trim(),
                            href: l.getAttribute('href'),
                            html: l.outerHTML
                        });
                    });
                }
            }

            // Fallback: look at all links under the collapse open
            const allOpenCollapses = document.querySelectorAll('.collapse.show, .collapsing');
            const openCollapseData = [];
            allOpenCollapses.forEach(c => {
                const links = Array.from(c.querySelectorAll('a')).map(a => ({
                    title: a.innerText.trim(),
                    href: a.getAttribute('href'),
                    outerHTML: a.outerHTML
                }));
                openCollapseData.push({ id: c.id, links });
            });

            return {
                bookingsElInfo: bookingsEl ? { text: bookingsEl.innerText, href: bookingsEl.getAttribute('href'), id: bookingsEl.id } : null,
                subItems,
                openCollapseData
            };
        }""")

        print(json.dumps(result, indent=2))
        browser.close()

if __name__ == "__main__":
    inspect_bookings_dom()
