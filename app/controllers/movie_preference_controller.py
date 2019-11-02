from flask import abort, jsonify, request

from app import db
from app.models import MoviePreference, PreferenceTypes
from app.util.tmdb_helpers import get_movie
from app.util.concurrency import call_one_func_parallel

class MoviePreferenceController():
    def create(self, user):
        data = request.get_json()
        external_movie_id = data.get('externalMovieId', None)
        preference_type = data.get('preferenceType', PreferenceTypes.positive)
        if not external_movie_id:
            abort(400)

        mp = MoviePreference(user, external_movie_id, preference_type)
        db.session.commit()

        return jsonify(mp.to_dict())

    def update(self, user, movie_preference_id):
        data = request.get_json()
        preference_type = data.get('preferenceType')
        if not movie_preference_id:
            abort(400)

        mp = MoviePreference.query\
            .filter(MoviePreference.id == movie_preference_id)\
            .filter(MoviePreference.user_id == user.id)\
            .one_or_none()

        mp.preference_type = preference_type
        db.session.commit()

        return jsonify(mp.to_dict())

    def get_all(self, user):
        user_movie_preferences = user.movies

        results = call_one_func_parallel(user_movie_preferences, lambda mp: get_movie(mp.external_movie_id))

        movie_preferences = []
        for mp, external_movie in results:
            movie_preference_dict = mp.to_dict()
            movie_preference_dict['movie'] = external_movie
            movie_preferences.append(movie_preference_dict)

        movie_preferences.sort(key=lambda m: m['movie']["title"])

        return jsonify({'moviePreferences': movie_preferences})

    def delete(self, user, movie_preference_id):
        movie_preference = MoviePreference.query.get(movie_preference_id)

        db.session.delete(movie_preference)
        db.session.commit()

        return jsonify({"success": True})
