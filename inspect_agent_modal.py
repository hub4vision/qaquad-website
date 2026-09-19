import time
from playwright.sync_api import sync_playwright

def inspect_agent_modal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

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

        page.goto("http://mus-bo.eye4travel.com/book-for-agent", timeout=45000, wait_until="networkidle")
        page.wait_for_timeout(2000)
        page.locator("button:has-text('Search')").click()
        page.wait_for_timeout(3000)

        # Inspect if #bookingModal exists in DOM
        modal_dom = page.evaluate("""() => {
            const modal = document.querySelector('#bookingModal');
            const allModals = Array.from(document.querySelectorAll('.modal, [id*="modal" i]')).map(m => ({
                id: m.id,
                className: m.className,
                innerHTML: m.innerHTML.substring(0, 300)
            }));
            const btn = document.querySelector('.btn-select-agent');
            return {
                bookingModalExists: !!modal,
                bookingModalClass: modal ? modal.className : null,
                allModals,
                btnData: btn ? {
                    target: btn.getAttribute('data-bs-target'),
                    toggle: btn.getAttribute('data-bs-toggle')
                } : null
            };
        }""")
        print("Agent modal DOM check:")
        import json
        print(json.dumps(modal_dom, indent=2))

        # Now click the button and check class again
        page.locator(".btn-select-agent").first.click()
        page.wait_for_timeout(1000)

        modal_after_click = page.evaluate("""() => {
            const modal = document.querySelector('#bookingModal');
            return modal ? {
                className: modal.className,
                style: modal.getAttribute('style'),
                display: window.getComputedStyle(modal).display,
                visibility: window.getComputedStyle(modal).visibility,
                opacity: window.getComputedStyle(modal).opacity
            } : null;
        }""")
        print("Modal state after click:")
        print(json.dumps(modal_after_click, indent=2))

        browser.close()

if __name__ == "__main__":
    inspect_agent_modal()
