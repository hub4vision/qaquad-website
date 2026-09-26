import sys
import time
from playwright.sync_api import sync_playwright

def run():
    print("Starting Playwright Chromium...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1440, 'height': 900})
        page = context.new_page()

        # Listen to console and request failures
        page.on("console", lambda msg: print(f"[CONSOLE {msg.type}] {msg.text}"))
        page.on("requestfailed", lambda req: print(f"[REQ FAILED] {req.method} {req.url} - {req.failure}"))

        print("Navigating to http://mus-bo.eye4travel.com/auth/login ...")
        try:
            page.goto("http://mus-bo.eye4travel.com/auth/login", timeout=45000, wait_until="networkidle")
        except Exception as e:
            print(f"Navigation error or timeout: {e}")

        print(f"Current URL: {page.url}")
        print(f"Page title: {page.title()}")

        # Take screenshot of login page
        page.screenshot(path="d:/Testing/Website/website1/login_page.png")
        print("Login page screenshot saved to login_page.png")

        # Let's inspect form inputs
        inputs = page.locator("input").all()
        print(f"Found {len(inputs)} inputs:")
        for idx, inp in enumerate(inputs):
            name = inp.get_attribute("name")
            placeholder = inp.get_attribute("placeholder")
            inp_type = inp.get_attribute("type")
            inp_id = inp.get_attribute("id")
            print(f"Input {idx}: id={inp_id}, name={name}, type={inp_type}, placeholder={placeholder}")

        # Fill Company Code
        print("Filling login details...")
        comp_input = page.locator("input[placeholder*='Company' i], input[name*='company' i], input[id*='company' i]")
        if comp_input.count() > 0:
            comp_input.first.fill("MUS")
        else:
            inputs[0].fill("MUS")

        # Check Username
        user_input = page.locator("input[placeholder*='User' i], input[name*='user' i], input[id*='user' i]")
        if user_input.count() > 0:
            user_input.first.fill("admin")
        else:
            inputs[1].fill("admin")

        # Check Password
        pass_input = page.locator("input[type='password'], input[placeholder*='Pass' i], input[name*='pass' i]")
        if pass_input.count() > 0:
            pass_input.first.fill("admin@MUS@")
        else:
            inputs[2].fill("admin@MUS@")

        print("Filled credentials. Looking for 'Send OTP' button...")
        send_otp_btn = page.locator("button:has-text('Send OTP'), input[value*='Send OTP' i], [role='button']:has-text('Send OTP')")
        print(f"Send OTP button count: {send_otp_btn.count()}")

        # Take screenshot before click
        page.screenshot(path="d:/Testing/Website/website1/before_send_otp.png")

        send_otp_btn.first.click()
        print("Clicked Send OTP. Waiting 3 seconds...")
        time.sleep(3)

        # Check for alert / dialog / popup / toast
        page.screenshot(path="d:/Testing/Website/website1/after_send_otp.png")
        print(f"Current URL after Send OTP: {page.url}")

        # Look for dialog OK button or similar
        ok_btn = page.locator("button:has-text('OK'), button:has-text('Ok'), .swal2-confirm")
        if ok_btn.count() > 0 and ok_btn.first.is_visible():
            print("Dialog OK button visible, clicking OK...")
            ok_btn.first.click()
            time.sleep(1)

        # Look for OTP input
        print("Looking for OTP input...")
        otp_input = page.locator("input[placeholder*='OTP' i], input[name*='otp' i], input[id*='otp' i]")
        print(f"OTP input count: {otp_input.count()}")
        if otp_input.count() > 0:
            otp_input.first.fill("xH9e1KxzFAPlAJ5")
            print("Filled OTP.")
        else:
            all_inp = page.locator("input:visible").all()
            print(f"Visible inputs: {len(all_inp)}")
            for idx, inp in enumerate(all_inp):
                print(f"Visible Input {idx}: placeholder={inp.get_attribute('placeholder')}, type={inp.get_attribute('type')}")
            if len(all_inp) > 0:
                all_inp[-1].fill("xH9e1KxzFAPlAJ5")

        # Click Verify & Login
        print("Looking for Verify & Login button...")
        login_btn = page.locator("button:has-text('Verify & Login'), button:has-text('Verify'), button:has-text('Login')")
        print(f"Login button count: {login_btn.count()}")
        login_btn.first.click()

        print("Clicked Verify & Login. Waiting 5 seconds...")
        time.sleep(5)
        try:
            page.wait_for_load_state("networkidle", timeout=15000)
        except Exception:
            pass

        print(f"URL after login: {page.url}")
        print(f"Title: {page.title()}")
        page.screenshot(path="d:/Testing/Website/website1/after_login.png")

        browser.close()

if __name__ == "__main__":
    run()
