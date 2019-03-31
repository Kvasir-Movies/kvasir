from flask import abort, jsonify, request

from app import db
from app.models import MoviePreference
from app.util.tmdb_helpers import get_movie
from app.util.concurrency import call_parallel

class MoviePreferenceController():
    def create(self, user):
        data = request.get_json()
        external_movie_id = data.get('externalMovieId', None)
        if not external_movie_id:
            abort(400)

        mp = MoviePreference(user, external_movie_id)
        db.session.commit()

        return jsonify(mp.to_dict())

    def update(self, user, movie_preference_id):
        data = request.get_json()
        preference_type = data.get('preference_type')
        if not movie_preference_id:
            abort(400)

        mp = MoviePreference.query\
            .filter(MoviePreference.id == movie_preference_id)\
            .filter(MoviePreference.user_id == user.id)\
            .one_or_none()

        mp.preference_type = preference_type
        db.session.commit()

        return jsonify(mp.to_dict())

    def get(self, user):
        user_movie_preferences = user.movies

        # Wrap get_movie calls inside lambdas, then call these lambdas in parallel.
        get_movie_lambdas = map(lambda mp: (lambda: get_movie(mp.external_movie_id)), user_movie_preferences)
        results = call_parallel(get_movie_lambdas)

        movies = []
        for zipped_result in zip(user_movie_preferences, results):
            (mp, external_movie) = zipped_result
            movie_preference_dict = mp.to_dict()
            movie_preference_dict.update(external_movie)
            movies.append(movie_preference_dict)

        movies.sort(key=lambda m: m["title"])

        return jsonify({'movies': movies})

    def delete(self, user, movie_preference_id):
        movie_preference = MoviePreference.query.get(movie_preference_id)

        db.session.delete(movie_preference)
        db.session.commit()

        return jsonify({"success": True})
