from flask import jsonify, send_from_directory

from app import app, BUILD_DIR
from app.controllers import (
    ExploreController,
    FriendshipController,
    LoginController,
    LogoutController,
    MoviePreferenceController,
    MovieSearchController,
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
        return jsonify(user=get_current_session_user().to_dict())
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


# REST resource APIs
@app.route('/users/<user_id>/movie-preferences/', methods=['GET'])
@authorization_required
def get_movie_preferences(user):
    return MoviePreferenceController().get(user)


@app.route('/users/<user_id>/movie-preferences', methods=['POST'])
@authorization_required
def create_movie_preference(user):
    return MoviePreferenceController().create(user)


@app.route('/users/<user_id>/movie-preferences/<movie_preference_id>', methods=['PATCH'])
@authorization_required
def update_movie_preference(user, movie_preference_id):
    return MoviePreferenceController().update(user, movie_preference_id)


@app.route('/users/<user_id>/movie-preferences/<movie_preference_id>', methods=['DELETE'])
@authorization_required
def delete_movie_preference(user, movie_preference_id):
    return MoviePreferenceController().delete(user, movie_preference_id)


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


@app.route('/explore')
def get_explore():
    return ExploreController().handle()
