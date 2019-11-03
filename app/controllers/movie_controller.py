import json

from flask import request

from app.models import MoviePreference, PreferenceTypes
from app.util import tmdb_helpers
from app.util.concurrency import call_one_func_parallel
from app.util.session_util import get_current_session_user


class MovieController():
    def search_movies(self):
        searchword = request.args.get('search', '')

        return json.dumps({
            'movies': tmdb_helpers.search_movies(searchword)
        })

    def explore_movies(self):
        sort_method = request.args.get('sort', None)

        return json.dumps({
            'movies': tmdb_helpers.explore(sort_method)
        })


    def list_liked_movies(self, user):
        user_movie_preferences = [
            mp for mp in user.movie_preferences
            if mp.preference_type == PreferenceTypes.positive
        ]

        results = call_one_func_parallel(user_movie_preferences,
            lambda mp: tmdb_helpers.get_movie(mp.external_movie_id))

        # We don't store modified at,
        results = sorted(results, key=lambda tup: tup[0].id, reverse=True)

        # Each result is a (MoviePreference, movie dict) tuple
        movies = [result[1] for result in results]

        return json.dumps({
            'movies': movies
        })
