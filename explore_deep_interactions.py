import os
import time
from playwright.sync_api import sync_playwright

OUTPUT_DIR = "D:/Testing/BlackBoxTest/GEN_Core_BlackBoxTest_Admin_Menu/Bookings_Test_Run/deep_artifacts"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def explore_deep():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        console_errors = []
        network_logs = []

        page.on("console", lambda msg: console_errors.append(f"[{msg.type.upper()}] {msg.text}") if msg.type in ['error', 'warning'] else None)
        page.on("requestfailed", lambda req: network_logs.append(f"[FAILED REQ] {req.method} {req.url} - {req.failure}"))
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
        # 1. DEEP TEST: BK-01 Manage Existing Bookings (/search-booking)
        # -------------------------------------------------------------
        print("\n--- Deep testing BK-01: /search-booking ---")
        page.goto("http://mus-bo.eye4travel.com/search-booking", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(6000) # wait for spinner to complete or timeout

        page.screenshot(path=f"{OUTPUT_DIR}/bk01_after_load_wait.png", full_page=True)

        # Check if spinner is still there or if table loaded
        spinner_visible = page.locator("text='Searching Bookings...'").is_visible()
        print(f"Is 'Searching Bookings...' spinner still visible: {spinner_visible}")

        # Check table
        rows = page.locator("table tbody tr")
        print(f"Table rows count on load: {rows.count()}")
        if rows.count() > 0:
            first_row_text = rows.first.inner_text()
            print(f"First row text: {first_row_text[:120]}")

        # Test "Add Filter" button
        add_filter_btn = page.locator("button:has-text('Add Filter')")
        if add_filter_btn.count() > 0:
            print("Clicking 'Add Filter' button...")
            add_filter_btn.click()
            page.wait_for_timeout(1000)
            page.screenshot(path=f"{OUTPUT_DIR}/bk01_add_filter_clicked.png")

        # Test Search with Service dropdown
        # Look at Service dropdown options
        service_select = page.locator("select").first
        if service_select.count() > 0:
            opts = service_select.locator("option").all_inner_texts()
            print(f"Service options: {opts}")

        # Click Search button
        search_btn = page.locator("button:has-text('Search')").first
        if search_btn.count() > 0:
            print("Clicking 'Search' button...")
            search_btn.click()
            page.wait_for_timeout(4000)
            page.screenshot(path=f"{OUTPUT_DIR}/bk01_search_clicked.png")

        # -------------------------------------------------------------
        # 2. DEEP TEST: BK-02 Cancellation Queue (/cancellation-queue)
        # -------------------------------------------------------------
        print("\n--- Deep testing BK-02: /cancellation-queue ---")
        page.goto("http://mus-bo.eye4travel.com/cancellation-queue", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)

        # Check dropdowns
        selects = page.locator("select").all()
        print(f"Cancellation queue selects count: {len(selects)}")
        for idx, s in enumerate(selects):
            opts = s.locator("option").all_inner_texts()
            print(f"Select {idx} options: {opts[:5]}")

        # Click Submit
        submit_btn = page.locator("button:has-text('Submit')")
        if submit_btn.count() > 0:
            print("Clicking 'Submit' on Cancellation Queue...")
            submit_btn.click()
            page.wait_for_timeout(3000)
            page.screenshot(path=f"{OUTPUT_DIR}/bk02_after_submit.png")
            print(f"Table or results after submit: {page.locator('table').count()} tables found")

        # -------------------------------------------------------------
        # 3. DEEP TEST: BK-03 & BK-04 Dead links
        # -------------------------------------------------------------
        print("\n--- Deep testing BK-03 & BK-04 Dead links ---")
        # Open Bookings menu
        page.locator("text='Bookings'").first.click()
        page.wait_for_timeout(1000)
        void_link = page.locator("#menu-link-263")
        print(f"BK-03 'Can Void the Tickets' tag: {void_link.evaluate('el => el.tagName')}, href: {void_link.get_attribute('href')}, onclick: {void_link.get_attribute('onclick')}")
        url_before = page.url
        void_link.click()
        page.wait_for_timeout(1000)
        print(f"URL after clicking 'Can Void the Tickets': {page.url} (Changed: {page.url != url_before})")

        offline_link = page.locator("#menu-link-2285")
        print(f"BK-04 'Offline Flight Booking for Agent' tag: {offline_link.evaluate('el => el.tagName')}, href: {offline_link.get_attribute('href')}, onclick: {offline_link.get_attribute('onclick')}")
        url_before = page.url
        offline_link.click()
        page.wait_for_timeout(1000)
        print(f"URL after clicking 'Offline Flight Booking for Agent': {page.url} (Changed: {page.url != url_before})")

        # -------------------------------------------------------------
        # 4. DEEP TEST: BK-05 Book for an Agent (/book-for-agent)
        # -------------------------------------------------------------
        print("\n--- Deep testing BK-05: /book-for-agent ---")
        page.goto("http://mus-bo.eye4travel.com/book-for-agent", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)

        # Click Search without criteria
        search_btn = page.locator("button:has-text('Search')")
        print("Clicking Search on Book for an Agent...")
        search_btn.click()
        page.wait_for_timeout(3000)
        page.screenshot(path=f"{OUTPUT_DIR}/bk05_after_search.png", full_page=True)

        rows = page.locator("table tbody tr")
        print(f"Book for agent rows count: {rows.count()}")
        if rows.count() > 0:
            print(f"Row 1: {rows.first.inner_text()[:120]}")
            # Check for action buttons / Book buttons
            action_btns = rows.first.locator("button, a").all()
            print(f"Row 1 action buttons/links count: {len(action_btns)}")

        # -------------------------------------------------------------
        # 5. DEEP TEST: BK-06 Book for a Direct Client (/book-for-client)
        # -------------------------------------------------------------
        print("\n--- Deep testing BK-06: /book-for-client ---")
        page.goto("http://mus-bo.eye4travel.com/book-for-client", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)

        # Test Non-Registered Client -> Go
        go_btn = page.locator("button:has-text('Go')")
        print("Testing Non-Registered Client -> Go...")
        go_btn.click()
        page.wait_for_timeout(3000)
        print(f"URL after Non-Registered Client Go: {page.url}")
        page.screenshot(path=f"{OUTPUT_DIR}/bk06_non_registered_go.png", full_page=True)

        # Back to /book-for-client
        page.goto("http://mus-bo.eye4travel.com/book-for-client", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)
        # Select Choose Registered Client
        registered_radio = page.locator("input[type='radio']").nth(1)
        # or click the card
        reg_card = page.locator("text='Choose Registered Client'").first
        reg_card.click()
        page.wait_for_timeout(1000)
        page.screenshot(path=f"{OUTPUT_DIR}/bk06_choose_registered_selected.png")

        # -------------------------------------------------------------
        # 6. DEEP TEST: BK-07 Amendment Enquiry List (/amend-enquiry)
        # -------------------------------------------------------------
        print("\n--- Deep testing BK-07: /amend-enquiry ---")
        page.goto("http://mus-bo.eye4travel.com/amend-enquiry", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)

        # Test Search input
        search_box = page.locator("input[placeholder*='Search' i]").last
        if search_box.count() > 0:
            print("Filtering Amendment Enquiry table with 'Nagpal'...")
            search_box.fill("Nagpal")
            page.wait_for_timeout(1500)
            page.screenshot(path=f"{OUTPUT_DIR}/bk07_searched_nagpal.png")

        # Click Edit on the first row
        edit_btn = page.locator("button:has-text('Edit'), a:has-text('Edit')").first
        if edit_btn.count() > 0:
            print("Clicking 'Edit' on first amendment row...")
            edit_btn.click()
            page.wait_for_timeout(3000)
            print(f"URL after Edit click: {page.url}")
            page.screenshot(path=f"{OUTPUT_DIR}/bk07_edit_clicked.png", full_page=True)

        print("\n--- Console Errors Captured ---")
        for err in console_errors:
            print(err)

        print("\n--- Network Errors Captured ---")
        for err in network_logs:
            print(err)

        browser.close()

if __name__ == "__main__":
    explore_deep()
