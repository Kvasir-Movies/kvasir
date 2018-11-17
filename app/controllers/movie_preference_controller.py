from flask import abort, jsonify, request

from app import db
from app.models import MoviePreference, User
from app.util.session_util import get_current_session_user
from app.util.tmdb_helpers import get_movie


class MoviePreferenceController():
    def create(self, user_id):
        user = get_current_session_user()
        if user is not User.query.get(user_id):
            abort(403)

        data = request.get_json()
        external_movie_id = data.get('externalMovieId', None)
        if not external_movie_id:
            abort(400)

        mp = MoviePreference(user, external_movie_id)
        db.session.commit()

        return jsonify(mp.to_dict())

    def get(self, user_id):
        user = get_current_session_user()
        if user is not User.query.get(user_id):
            abort(403)

        movie_ids = [mp.external_movie_id for mp in user.movies]

        movies = []
        for id in movie_ids:
            movie = get_movie(id)
            movies.append(movie)

        return jsonify({'movies': movies})