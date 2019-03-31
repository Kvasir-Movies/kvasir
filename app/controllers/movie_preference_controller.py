from flask import abort, jsonify, request

from app import db
from app.models import MoviePreference
from app.util.tmdb_helpers import get_movie


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

        movies = []
        for mp in user_movie_preferences:
            external_movie = get_movie(mp.external_movie_id)
            movie_preference_dict = mp.to_dict()
            movie_preference_dict.update({"title": external_movie["title"]})
            movies.append(movie_preference_dict)

        movies.sort(key=lambda m: m["title"])

        return jsonify({'movies': movies})

    def delete(self, user, movie_preference_id):
        movie_preference = MoviePreference.query.get(movie_preference_id)

        db.session.delete(movie_preference)
        db.session.commit()

        return jsonify({"success": True})