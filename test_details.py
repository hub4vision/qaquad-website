import os
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "D:/Testing/BlackBoxTest/GEN_Core_BlackBoxTest_Admin_Menu/Bookings_Test_Run/deep_artifacts"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def test_details():
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

        # -------------------------------------------------------------
        # 1. Test clicking Reservation Ref in Manage Existing Bookings
        # -------------------------------------------------------------
        print("\n1. Testing reservation click on /search-booking...")
        page.goto("http://mus-bo.eye4travel.com/search-booking", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(5000)

        # Click the first reservation link
        ref_link = page.locator("table tbody tr td a").first
        if ref_link.count() > 0:
            ref_text = ref_link.inner_text().strip()
            print(f"Clicking first reservation ref: {ref_text}...")
            ref_link.click()
            page.wait_for_timeout(4000)
            print(f"URL after clicking ref: {page.url}")
            page.screenshot(path=f"{OUTPUT_DIR}/bk01_booking_details.png", full_page=True)

        # Test Select Columns (21) button
        page.goto("http://mus-bo.eye4travel.com/search-booking", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(4000)
        col_btn = page.locator("button:has-text('Select Columns')")
        if col_btn.count() > 0:
            print("Clicking 'Select Columns' button...")
            col_btn.click()
            page.wait_for_timeout(1000)
            page.screenshot(path=f"{OUTPUT_DIR}/bk01_select_columns_modal.png")

        # -------------------------------------------------------------
        # 2. Test Book for an Agent - Clicking 'SELECT' on row 1
        # -------------------------------------------------------------
        print("\n2. Testing SELECT agent on /book-for-agent...")
        page.goto("http://mus-bo.eye4travel.com/book-for-agent", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)
        page.locator("button:has-text('Search')").click()
        page.wait_for_timeout(3000)

        select_agent_btn = page.locator("table tbody tr button:has-text('SELECT'), table tbody tr a:has-text('SELECT')").first
        if select_agent_btn.count() > 0:
            print("Clicking SELECT on agent row 1...")
            select_agent_btn.click()
            page.wait_for_timeout(3000)
            print(f"URL after SELECT agent: {page.url}")
            page.screenshot(path=f"{OUTPUT_DIR}/bk05_agent_selected_modal.png", full_page=True)

        # -------------------------------------------------------------
        # 3. Test Book for a Direct Client - Choose Registered Client
        # -------------------------------------------------------------
        print("\n3. Testing 'Choose Registered Client' on /book-for-client...")
        page.goto("http://mus-bo.eye4travel.com/book-for-client", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)

        # In DOM, let's inspect the cards
        # Find radio inputs
        page.evaluate("""() => {
            const radios = document.querySelectorAll('input[name="clientType"]');
            if (radios.length > 1) {
                radios[1].checked = true;
                radios[1].dispatchEvent(new Event('change', { bubbles: true }));
                radios[1].dispatchEvent(new Event('input', { bubbles: true }));
            }
        }""")
        page.wait_for_timeout(1500)
        page.screenshot(path=f"{OUTPUT_DIR}/bk06_registered_client_radio_selected.png")

        # Click Go
        page.locator("button:has-text('Go')").click()
        page.wait_for_timeout(3000)
        print(f"URL after Registered Client -> Go: {page.url}")
        page.screenshot(path=f"{OUTPUT_DIR}/bk06_registered_client_after_go.png", full_page=True)

        # -------------------------------------------------------------
        # 4. Test Amendment Enquiry List - Click Edit
        # -------------------------------------------------------------
        print("\n4. Testing Edit on /amend-enquiry...")
        page.goto("http://mus-bo.eye4travel.com/amend-enquiry", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(3000)

        edit_btn = page.locator("table tbody tr button:has-text('Edit'), table tbody tr a:has-text('Edit')").first
        if edit_btn.count() > 0:
            print("Clicking Edit on row 1...")
            edit_btn.click()
            page.wait_for_timeout(3000)
            print(f"URL after Edit: {page.url}")
            page.screenshot(path=f"{OUTPUT_DIR}/bk07_edit_modal.png", full_page=True)

        print("\n--- Summary of Errors ---")
        print(f"Console errors: {len(console_errors)}")
        for e in console_errors[:10]:
            print(e)
        print(f"Network errors: {len(network_logs)}")
        for n in network_logs[:10]:
            print(n)

        browser.close()

if __name__ == "__main__":
    test_details()
