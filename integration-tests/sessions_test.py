import unittest

from selenium import webdriver

LOCAL_HOST = 'http://localhost:3000/'


class SignupTest(unittest.TestCase):
    def test_signup(self):
        driver = webdriver.Chrome()
        driver.get(LOCAL_HOST)

        assert driver.title == "Kvasir Movies"
        driver.find_element_by_class_name("signup").click()

        email_input = driver.find_element_by_name('email')
        assert email_input
        password_input = driver.find_element_by_name('password')
        assert password_input
        driver.close()