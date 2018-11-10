from app import app, BUILD_DIR
from app.controllers import LoginController, LogoutController, OMDBSearchController, SignupController
from app.session_util import is_user_logged_in, login_required, get_current_session_user

from flask import jsonify, send_from_directory, session


# For all routes, return index.html (so that React Router can handle routing).
# Flask matches the most specific routes first, so this will only be called
# if nothing else matches.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    return send_from_directory(BUILD_DIR, 'index.html')


@app.route('/current-user')
def get_current_user():
    if is_user_logged_in():
        user = get_current_session_user()
        user_dict = {'email': user.email}
    else:
        user_dict = None
    return jsonify(user=user_dict)


@app.route('/session', methods=['GET'])
def get_session():
    if is_user_logged_in():
        return jsonify(email=session['email'])
    else:
        return jsonify(email='')


@app.route('/login', methods=['POST'])
def login():
    return LoginController().handle()


@app.route('/search-movies')
@login_required
def search_omdb_movies():
    return OMDBSearchController().handle()


@app.route('/signup', methods=['POST'])
def signup():
    return SignupController().handle()


@app.route('/logout', methods=['POST'])
def logout():
    return LogoutController().handle()

