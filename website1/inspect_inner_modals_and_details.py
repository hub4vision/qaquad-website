import os
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "D:/Testing/BlackBoxTest/GEN_Core_BlackBoxTest_Admin_Menu/Bookings_Test_Run/deep_artifacts"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        console_errors = []
        network_logs = []

        page.on("console", lambda msg: console_errors.append(f"[{msg.type.upper()}] {msg.text} (URL: {page.url})") if msg.type in ['error', 'warning'] else None)
        page.on("requestfailed", lambda req: network_logs.append(f"[REQ FAILED] {req.method} {req.url} - {req.failure}"))
        page.on("response", lambda res: network_logs.append(f"[RESP {res.status}] {res.request.method} {res.url}") if res.status >= 400 else None)

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

        # 1. Booking Details Inner Page: /booking-details/AIR/M-T128117M
        print("\n1. Navigating to Booking Details page...")
        page.goto("http://mus-bo.eye4travel.com/booking-details/AIR/M-T128117M", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(4000)
        print(f"URL: {page.url}")
        print(f"Title: {page.title()}")
        page.screenshot(path=f"{OUTPUT_DIR}/bk01_booking_details_page.png", full_page=True)

        # Check tabs/sections on Booking Details
        details_info = page.evaluate("""() => {
            const h = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, .card-title')).map(el => el.innerText.trim()).filter(Boolean);
            const btns = Array.from(document.querySelectorAll('button:not([style*="display: none"])')).map(el => el.innerText.trim()).filter(Boolean);
            const tabs = Array.from(document.querySelectorAll('.nav-tabs .nav-link, [role=tab]')).map(el => el.innerText.trim()).filter(Boolean);
            const tables = Array.from(document.querySelectorAll('table')).map(t => {
                const headers = Array.from(t.querySelectorAll('th')).map(th => th.innerText.trim());
                return { headers, rows: t.querySelectorAll('tbody tr').length };
            });
            return { headers: h, buttons: btns, tabs, tables };
        }""")
        print(f"Booking Details info: {details_info}")

        # 2. Book for an Agent Modal: /book-for-agent
        print("\n2. Testing Book for an Agent Modal...")
        page.goto("http://mus-bo.eye4travel.com/book-for-agent", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)
        page.locator("button:has-text('Search')").click()
        page.wait_for_timeout(3000)

        # Click Select
        page.locator("table tbody tr .btn-select-agent").first.click()
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{OUTPUT_DIR}/bk05_agent_modal_opened.png", full_page=True)
        modal_visible = page.locator("#bookingModal, .modal.show").is_visible()
        print(f"Is bookingModal visible: {modal_visible}")
        if modal_visible:
            modal_title = page.locator("#bookingModal .modal-title, .modal.show .modal-title").inner_text()
            print(f"Modal title: {modal_title}")

        # 3. Book for Direct Client - Registered Client Select
        print("\n3. Testing Book for Direct Client - Registered Client Select...")
        page.goto("http://mus-bo.eye4travel.com/book-for-client", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)
        # Select Choose Registered Client
        page.evaluate("""() => {
            const cards = document.querySelectorAll('.selection-card');
            if (cards.length > 1) cards[1].click();
        }""")
        page.wait_for_timeout(2000)
        # Click Select button on row 1
        page.locator(".table tbody tr button:has-text('Select')").first.click()
        page.wait_for_timeout(2000)
        page.screenshot(path=f"{OUTPUT_DIR}/bk06_registered_client_modal_opened.png", full_page=True)

        # 4. Amendment Enquiry List - Edit Button
        print("\n4. Testing Amendment Enquiry List - Edit Button...")
        page.goto("http://mus-bo.eye4travel.com/amend-enquiry", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(3000)
        page.locator("table tbody tr button:has-text('Edit'), table tbody tr a:has-text('Edit')").first.click()
        page.wait_for_timeout(2500)
        page.screenshot(path=f"{OUTPUT_DIR}/bk07_edit_opened.png", full_page=True)
        amend_modal = page.locator(".modal.show, [role=dialog]:visible")
        print(f"Is amendment edit modal/dialog visible: {amend_modal.count() > 0}")
        if amend_modal.count() > 0:
            print(f"Modal text snippet: {amend_modal.first.inner_text()[:200]}")

        print("\n--- Errors during run ---")
        for e in console_errors:
            print(f"Console: {e}")
        for n in network_logs:
            print(f"Network: {n}")

        browser.close()

if __name__ == "__main__":
    run()
