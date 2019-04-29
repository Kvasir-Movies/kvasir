import os
import unittest

from selenium.webdriver import Firefox
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

LOCAL_HOST = 'http://localhost:3000/'


class SignupTest(unittest.TestCase):
    def test_signup(self):
        options = Options()
        if os.environ.get('CI', False):
            options.add_argument('-headless')
        driver = Firefox(options=options)
        driver.get(LOCAL_HOST)

        self.assertEqual(driver.title, "Reel Politik")

        signup_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.LINK_TEXT, 'Sign Up'))
        )
        signup_button.click()
        
        email_input = driver.find_element_by_name('email')
        email_input.clear()
        email_input.send_keys('naomi@jacobs.com')
        password_input = driver.find_element_by_name('password')
        password_input.clear()
        password_input.send_keys('super secret')
        driver.close()


if __name__ == '__main__':
    unittest.main()
