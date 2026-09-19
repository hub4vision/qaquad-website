import os
import json
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "D:/Testing/BlackBoxTest/GEN_Core_BlackBoxTest_Admin_Menu/Bookings_Test_Run"
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/screenshots", exist_ok=True)

def inspect_all():
    print("Starting deep inspection of Bookings submenu pages...")
    results = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        console_logs = []
        network_errors = []

        page.on("console", lambda msg: console_logs.append({"type": msg.type, "text": msg.text, "url": page.url}))
        page.on("requestfailed", lambda req: network_errors.append({"url": req.url, "method": req.method, "failure": req.failure, "page_url": page.url}))

        # 1. Login
        print("Logging in...")
        page.goto("http://mus-bo.eye4travel.com/auth/login", timeout=45000, wait_until="networkidle")
        page.locator("input[placeholder*='Company' i]").fill("MUS")
        page.locator("input[placeholder*='User' i]").fill("admin")
        page.locator("input[type='password']").fill("admin@MUS@")
        page.locator("button:has-text('Send OTP')").click()
        page.wait_for_timeout(3000)

        ok_btn = page.locator("button:has-text('OK'), button:has-text('Ok'), .swal2-confirm")
        if ok_btn.count() > 0 and ok_btn.first.is_visible():
            ok_btn.first.click()
            page.wait_for_timeout(1000)

        page.locator("input[placeholder*='OTP' i]").fill("xH9e1KxzFAPlAJ5")
        page.locator("button:has-text('Verify & Login')").click()
        page.wait_for_timeout(3000)

        ok_dialog = page.locator("button:has-text('OK'), button:has-text('Ok'), .swal2-confirm")
        if ok_dialog.count() > 0 and ok_dialog.first.is_visible():
            ok_dialog.first.click()
            page.wait_for_timeout(2000)

        print("Logged in successfully. Navigating to Bookings...")

        pages_to_test = [
            {
                "id": "BK-01",
                "title": "Manage Existing Bookings",
                "route": "/search-booking",
                "link_id": "menu-link-29",
                "click_menu": True
            },
            {
                "id": "BK-02",
                "title": "Cancellation Queue",
                "route": "/cancellation-queue",
                "link_id": "menu-link-45",
                "click_menu": True
            },
            {
                "id": "BK-03",
                "title": "Can Void the Tickets",
                "route": None,
                "link_id": "menu-link-263",
                "click_menu": True
            },
            {
                "id": "BK-04",
                "title": "Offline Flight Booking for Agent",
                "route": None,
                "link_id": "menu-link-2285",
                "click_menu": True
            },
            {
                "id": "BK-05",
                "title": "Book for an Agent",
                "route": "/book-for-agent",
                "link_id": "menu-link-40",
                "click_menu": True
            },
            {
                "id": "BK-06",
                "title": "Book for a Direct Client",
                "route": "/book-for-client",
                "link_id": "menu-link-41",
                "click_menu": True
            },
            {
                "id": "BK-07",
                "title": "Amendment Enquiry List",
                "route": "/amend-enquiry",
                "link_id": "menu-link-38",
                "click_menu": True
            }
        ]

        for item in pages_to_test:
            print(f"\n--- Testing {item['id']}: {item['title']} ---")
            item_console_before = len(console_logs)
            item_net_before = len(network_errors)

            # Open Bookings menu if collapsed
            bookings_collapse = page.locator("#sidebar-27")
            if not bookings_collapse.is_visible():
                page.locator("text='Bookings'").first.click()
                page.wait_for_timeout(1000)

            link_el = page.locator(f"#{item['link_id']}")
            print(f"Submenu link visible: {link_el.is_visible()}, href: {link_el.get_attribute('href')}")

            # Click link
            url_before = page.url
            link_el.click()
            page.wait_for_timeout(3000)
            url_after = page.url

            # Also try direct navigation if route exists and URL didn't change
            if item['route'] and url_after == url_before and not url_after.endswith(item['route']):
                print(f"Direct navigating to {item['route']}...")
                page.goto(f"http://mus-bo.eye4travel.com{item['route']}", timeout=30000, wait_until="networkidle")
                page.wait_for_timeout(2000)

            curr_url = page.url
            print(f"Current URL: {curr_url}")

            # Screenshot
            shot_name = f"{item['id'].lower()}_{item['title'].lower().replace(' ', '_')}.png"
            shot_path = f"{OUTPUT_DIR}/screenshots/{shot_name}"
            page.screenshot(path=shot_path, full_page=True)
            print(f"Saved screenshot to {shot_name}")

            # Extract page structure
            page_info = page.evaluate("""() => {
                const title = document.title;
                const h1 = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, .page-title, .card-title')).map(h => h.innerText.trim()).filter(Boolean);
                const breadcrumb = Array.from(document.querySelectorAll('.breadcrumb, .breadcrumb-item')).map(b => b.innerText.trim()).filter(Boolean);
                const buttons = Array.from(document.querySelectorAll('button, input[type=submit]'))
                    .filter(b => b.offsetParent !== null)
                    .map(b => b.innerText.trim() || b.value).filter(Boolean);
                const tabs = Array.from(document.querySelectorAll('.nav-tabs .nav-link, [role=tab], .tab-content')).map(t => t.innerText.trim()).filter(Boolean);
                const inputs = Array.from(document.querySelectorAll('input, select, textarea'))
                    .filter(i => i.offsetParent !== null)
                    .map(i => ({
                        name: i.name || i.id || '',
                        placeholder: i.placeholder || '',
                        type: i.type || i.tagName.toLowerCase(),
                        label: i.labels && i.labels[0] ? i.labels[0].innerText.trim() : ''
                    }));
                const tables = document.querySelectorAll('table');
                let tableData = [];
                tables.forEach((tbl, idx) => {
                    const headers = Array.from(tbl.querySelectorAll('th')).map(th => th.innerText.trim());
                    const rowsCount = tbl.querySelectorAll('tbody tr').length;
                    tableData.push({ idx, headers, rowsCount });
                });
                const bodyTextSnippet = document.body.innerText.substring(0, 500);

                return {
                    title,
                    h1,
                    breadcrumb,
                    buttons,
                    tabs,
                    inputsCount: inputs.length,
                    inputsSample: inputs.slice(0, 10),
                    tables: tableData,
                    bodyTextSnippet
                };
            }""")

            item_console = console_logs[item_console_before:]
            item_net = network_errors[item_net_before:]

            results[item['id']] = {
                "title": item['title'],
                "link_id": item['link_id'],
                "href": item['route'],
                "final_url": curr_url,
                "screenshot": shot_name,
                "page_info": page_info,
                "console_errors": [c for c in item_console if c['type'] in ['error', 'warning']],
                "network_errors": item_net
            }

        # Save results to json
        with open(f"{OUTPUT_DIR}/inspection_summary.json", "w") as f:
            json.dump(results, f, indent=2)

        print("\nInspection complete! Summary saved to inspection_summary.json.")
        browser.close()

if __name__ == "__main__":
    inspect_all()
