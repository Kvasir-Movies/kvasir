from app import app
from app.controllers import HomeController, LoginController, LoginPageController, OMDBSearchController
from app.models import User
from app.session_util import login_required

from flask import jsonify, render_template


@app.route('/current-user')
def get_current_user():
    user = User.query.first()
    user_dict = {'email': user.email} if user else None
    return jsonify(user=user_dict)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')

# Routes for serving html and js (deprecated)
# @app.route('/')
# @login_required
# def home():
#     return HomeController().handle()

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
