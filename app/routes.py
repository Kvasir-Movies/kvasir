from app import app
from app.controllers import HomeController, LoginController, LoginPageController

from flask import request

@app.route('/')
def home():
    return HomeController().handle()

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return LoginController().handle()
    else:
        return LoginPageController().handle()
