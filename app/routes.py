from app import app
from app.controllers import HomeController, LoginController, LoginPageController

from flask import request

@app.route('/')
def home():
    return HomeController().handle()

@app.route('/login', methods=['POST'])
def login():
    return LoginController().handle()

@app.route('/login', methods=['GET'])
def login_page():
    return LoginPageController().handle()
