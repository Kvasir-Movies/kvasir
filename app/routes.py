from flask import jsonify, send_from_directory

from app import app, BUILD_DIR
from app.controllers import (
    FriendshipController,
    LoginController,
    LogoutController,
    MovieController,
    MoviePreferenceController,
    RecommendationController,
    SignupController,
    SlackController,
    UserSearchController
)
from app.util.session_util import (
    authorization_required,
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
        return jsonify(user=get_current_session_user().to_dict(include_lists=True))
    else:
        return jsonify(user=None)


@app.route('/login', methods=['POST'])
def login():
    return LoginController().handle()


@app.route('/search-movies')
@login_required
def search_movies():
    return MovieController().search_movies()


@app.route('/explore')
def get_explore():
    return MovieController().explore_movies()


@app.route('/signup', methods=['POST'])
def signup():
    return SignupController().handle()


@app.route('/logout', methods=['POST'])
def logout():
    return LogoutController().handle()


# REST resource APIs
@app.route('/users/<user_id>/movie-preferences', methods=['PUT'])
@authorization_required
def upsert_movie_preference(user):
    return MoviePreferenceController().upsert(user)


@app.route('/users/<user_id>/actions:get-watchlist')
@authorization_required
def get_user_watchlist(user):
    return MovieController().list_liked_movies(user)


@app.route('/get-recommendation')
@login_required
def get_recommendation():
    return RecommendationController().handle()


@app.route('/users/<user_id>/friendships', methods=['POST'])
@authorization_required
def add_friendship(user):
    return FriendshipController().create(user)

@app.route('/users/search', methods=['GET'])
@login_required
def search_users():
    return UserSearchController().handle()

@app.route('/slack', methods=['POST'])
def get_slack():
    return SlackController().handle()
