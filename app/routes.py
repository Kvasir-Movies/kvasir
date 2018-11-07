import os

from app import app, BUILD_DIR
from app.controllers import HomeController, LoginController, LoginPageController, OMDBSearchController
from app.models import User
from app.session_util import login_required

from flask import jsonify, render_template, send_from_directory

# For all routes, return index.html (so that React Router can handle routing).
# Flask matches the most specific routes first, so this will only be called
# if nothing else matches.
# TODO: Add all login_required logic back
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(BUILD_DIR, 'index.html')

@app.route('/current-user')
def get_current_user():
    user = User.query.first()
    user_dict = {'email': user.email} if user else None
    return jsonify(user=user_dict)

@app.route('/search-movies')
@login_required
def search_omdb_movies():
    return OMDBSearchController().handle()


#############################################
# Deprecated routes for serving html and js #
#############################################

@app.route('/deprecated/')
@login_required
def home():
    return HomeController().handle()

@app.route('/deprecated/login', methods=['POST'])
def login():
    return LoginController().handle()

@app.route('/deprecated/login', methods=['GET'])
def login_page():
    return LoginPageController().handle()
