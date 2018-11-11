from flask import abort, jsonify, request

from app import db
from app.models import MoviePreference, User
from app.util.session_util import get_current_session_user


class MoviePreferenceController():
    def handle(self, user_id):
        user = get_current_session_user()
        if user is not User.query.get(user_id):
            abort(403)

        data = request.get_json()
        external_movie_id = data.get('externalMovieId', None)
        if not external_movie_id:
            abort(400)

        mp = MoviePreference(user, external_movie_id)
        db.session.commit()

        return jsonify({
            'external_movie_id': mp.external_movie_id,
            'user_id': mp.user_id
        })
