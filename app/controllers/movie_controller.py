import json

from flask import request

from app.models import MoviePreference, PreferenceTypes
from app.util import tmdb_helpers
from app.util.concurrency import call_one_func_parallel
from app.util.session_util import get_current_session_user


class MovieController():
    def _process_tmdb_movies(self, tmdb_movies):
        current_user = get_current_session_user()
        external_movie_ids = [m['id'] for m in tmdb_movies]
        preferences = MoviePreference.query.filter(
            MoviePreference.user == current_user,
            MoviePreference.external_movie_id.in_(external_movie_ids)
        ).all()

        processed_movies = []
        for movie in tmdb_movies:
            [current_user_preference] = [mp for mp in preferences
                if mp.external_movie_id == movie['externalMovieId']]
            processed_movie = {
                'currentUserPreference': current_user_preference.to_dict()
            }
            processed_movie.update(movie)
            processed_movies.append(processed_movie)

        return processed_movies


    def search_movies(self):
        searchword = request.args.get('search', '')

        return json.dumps({
            'movies': self._process_tmdb_movies(
                tmdb_helpers.search_movies(searchword)
            )
        })

    def explore_movies(self):
        sort_method = request.args.get('sort', None)

        return json.dumps({
            'movies': self._process_tmdb_movies(
                tmdb_helpers.explore(sort_method)
            )
        })


    def list_liked_movies(self, user):
        user_movie_preferences = [
            mp for mp in user.movie_preferences
            if mp.preference_type == PreferenceTypes.positive
        ]

        results = call_one_func_parallel(user_movie_preferences,
            lambda mp: tmdb_helpers.get_movie(mp.external_movie_id))
        results.sort(key=lambda m: m['movie']['title'])

        return json.dumps({
            'movies': self._process_tmdb_movies(
                results
            )
        })
