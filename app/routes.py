from app import app
from app.controllers import HomeController, LoginController, LoginPageController, OMDBSearchController

from flask import request

@app.route('/')
def home():
    return HomeController().handle()

@app.route('/search-movies')
def search_omdb_movies():
    return OMDBSearchController().handle()

@app.route('/login', methods=['POST'])
def login():
    return LoginController().handle()

@app.route('/login', methods=['GET'])
def login_page():
    return LoginPageController().handle()
