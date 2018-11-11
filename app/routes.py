from flask import jsonify, send_from_directory

from app import app, BUILD_DIR
from app.controllers import (
    LoginController,
    LogoutController,
    MovieSearchController,
    SignupController
)
from app.util.session_util import (
    get_current_session_user,
    is_user_logged_in,
    login_required
)


# For all routes, return index.html (so that React Router can handle routing).
# Flask matches the most specific routes first, so this will only be called
# if nothing else matches.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(BUILD_DIR, 'index.html')


@app.route('/session', methods=['GET'])
def get_session():
    if is_user_logged_in():
        return jsonify(user=get_current_session_user().serialize())
    else:
        return jsonify(user=None)


@app.route('/login', methods=['POST'])
def login():
    return LoginController().handle()


@app.route('/search-movies')
@login_required
def search_movies():
    return MovieSearchController().handle()


@app.route('/signup', methods=['POST'])
def signup():
    return SignupController().handle()


@app.route('/logout', methods=['POST'])
def logout():
    return LogoutController().handle()
