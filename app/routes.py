from app import app
from app.controllers import HomeController, LoginController, LoginPageController, OMDBSearchController

from flask import request

from app.session_util import login_required

@app.route('/')
@login_required
def home():
    return HomeController().handle()

@app.route('/search-movies')
@login_required
def search_omdb_movies():
    return OMDBSearchController().handle()

@app.route('/login', methods=['POST'])
def login():
    return LoginController().handle()

@app.route('/login', methods=['GET'])
def login_page():
    return LoginPageController().handle()
