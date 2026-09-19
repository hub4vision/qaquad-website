import time
from playwright.sync_api import sync_playwright

def inspect_actions():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        page.on("console", lambda msg: print(f"[CONSOLE {msg.type.upper()}] {msg.text}"))
        page.on("requestfailed", lambda req: print(f"[FAILED REQ] {req.method} {req.url} - {req.failure}"))
        page.on("response", lambda res: print(f"[HTTP {res.status}] {res.request.method} {res.url}") if res.status >= 400 else None)

        # Login
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

        # 1. Inspect BK-01 reservation link
        print("\n--- 1. Inspecting BK-01 Reservation Links ---")
        page.goto("http://mus-bo.eye4travel.com/search-booking", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(5000)
        ref_html = page.evaluate("""() => {
            const a = document.querySelector('table tbody tr td a');
            return a ? {
                outerHTML: a.outerHTML,
                href: a.getAttribute('href'),
                target: a.getAttribute('target'),
                onclick: a.getAttribute('onclick'),
                ngClick: a.getAttribute('(click)') || a.getAttribute('ng-click')
            } : null;
        }""")
        print(f"BK-01 Ref Link Info: {ref_html}")

        # Also let's test Export to Excel button
        print("Testing Export to Excel button...")
        export_btn = page.locator("button:has-text('Export to Excel')")
        print(f"Export button visible: {export_btn.is_visible()}")

        # 2. Inspect BK-05 SELECT agent
        print("\n--- 2. Inspecting BK-05 SELECT Agent ---")
        page.goto("http://mus-bo.eye4travel.com/book-for-agent", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)
        page.locator("button:has-text('Search')").click()
        page.wait_for_timeout(3000)
        agent_btn_html = page.evaluate("""() => {
            const btn = document.querySelector('table tbody tr button, table tbody tr a, table tbody tr td:first-child *');
            return btn ? {
                tagName: btn.tagName,
                outerHTML: btn.outerHTML,
                href: btn.getAttribute('href'),
                onclick: btn.getAttribute('onclick')
            } : null;
        }""")
        print(f"BK-05 Select Button Info: {agent_btn_html}")

        # Listen for new popup or page on click
        with context.expect_page(timeout=5000) as new_page_info:
            try:
                page.locator("table tbody tr button, table tbody tr a").first.click()
                print("Clicked SELECT on agent row 1")
            except Exception as e:
                print(f"Click error: {e}")
        try:
            new_p = new_page_info.value
            print(f"New tab opened! URL: {new_p.url}")
            new_p.screenshot(path="D:/Testing/BlackBoxTest/GEN_Core_BlackBoxTest_Admin_Menu/Bookings_Test_Run/deep_artifacts/bk05_new_tab.png")
        except Exception:
            print("No new tab opened.")

        # 3. Inspect BK-06 Registered Client SELECT
        print("\n--- 3. Inspecting BK-06 Registered Client SELECT ---")
        page.goto("http://mus-bo.eye4travel.com/book-for-client", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)
        page.evaluate("""() => {
            const cards = document.querySelectorAll('.selection-card');
            if (cards.length > 1) {
                cards[1].click();
            }
        }""")
        page.wait_for_timeout(2000)
        client_btn_html = page.evaluate("""() => {
            const btn = document.querySelector('.table tbody tr button, .table tbody tr a');
            return btn ? {
                tagName: btn.tagName,
                outerHTML: btn.outerHTML,
                href: btn.getAttribute('href')
            } : null;
        }""")
        print(f"BK-06 Select Client Button Info: {client_btn_html}")

        # Click Select on registered client row 1
        select_client_btn = page.locator("button:has-text('Select')").first
        if select_client_btn.count() > 0:
            print("Clicking Select on registered client...")
            select_client_btn.click()
            page.wait_for_timeout(3000)
            page.screenshot(path="D:/Testing/BlackBoxTest/GEN_Core_BlackBoxTest_Admin_Menu/Bookings_Test_Run/deep_artifacts/bk06_client_selected_modal.png", full_page=True)

        # 4. Inspect BK-07 Amendment Enquiry Edit
        print("\n--- 4. Inspecting BK-07 Amendment Enquiry Edit ---")
        page.goto("http://mus-bo.eye4travel.com/amend-enquiry", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(3000)
        edit_btn_html = page.evaluate("""() => {
            const btn = document.querySelector('table tbody tr button, table tbody tr a');
            return btn ? {
                tagName: btn.tagName,
                outerHTML: btn.outerHTML,
                href: btn.getAttribute('href')
            } : null;
        }""")
        print(f"BK-07 Edit Button Info: {edit_btn_html}")

        # Click Edit
        edit_btn = page.locator("button:has-text('Edit')").first
        if edit_btn.count() > 0:
            print("Clicking Edit button...")
            edit_btn.click()
            page.wait_for_timeout(3000)
            print(f"URL after Edit: {page.url}")
            page.screenshot(path="D:/Testing/BlackBoxTest/GEN_Core_BlackBoxTest_Admin_Menu/Bookings_Test_Run/deep_artifacts/bk07_edit_clicked.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    inspect_actions()
