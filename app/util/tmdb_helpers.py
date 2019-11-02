from app import app
import requests

from flask import g

from models import MoviePreferenceController

TMDB_API_KEY = app.config.get('TMDB_API_KEY')
TMDB_SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie'
TMDB_FIND_MOVIE_URL = 'https://api.themoviedb.org/3/movie/'
TMDB_EXPLORE_URLS = {
    'day_trend': 'https://api.themoviedb.org/3/trending/movie/day',
    'week_trend': 'https://api.themoviedb.org/3/trending/movie/week',
    'popularity': 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc'
}
EXPLORE_DEFAULT = 'popularity'

DESIRED_KEYS = [
    'title',
    'overview',
    'genres',
    'status'
]

class APIException(Exception):
    """Exception raised for failed API calls
    Attributes:
        status_code -- http status code
        message -- explanation of the error
    """
    def __init__(self, status_code, message):
        self.status_code = status_code
        self.message = message


def _format_tmdb_movie(tmdb_movie):
    formatted_movie = { desired_key: tmdb_movie.get(desired_key, None)
                        for desired_key in DESIRED_KEYS }
    formatted_movie['externalMovieId'] = tmdb_movie.get('id')
    formatted_movie['releaseDate'] = tmdb_movie.get('release_date', None)
    poster_path = tmdb_movie.get('poster_path', None)
    formatted_movie['posterPath'] = (
        'https://image.tmdb.org/t/p/w370_and_h556_bestv2/{}'
        .format(poster_path) if poster_path else None
    )
    return formatted_movie

def search_movies(search_term):
    params = {
        'api_key': TMDB_API_KEY,
        'query': search_term
    }
    response = requests.get(TMDB_SEARCH_MOVIE_URL, params=params)
    if response.status_code != 200:
        raise APIException(response.status_code,
                           response.json()['status_message'])
    return [_format_tmdb_movie(result) for result in response.json()['results']]

def get_movie(movie_id):
    params = {
        'api_key': TMDB_API_KEY,
    }
    response = requests.get(TMDB_FIND_MOVIE_URL + str(movie_id), params=params)

    if response.status_code != 200:
        raise APIException(response.status_code,
                           response.json()['status_message'])

    return _format_tmdb_movie(response.json())

def explore(sort_method):
    if sort_method in TMDB_EXPLORE_URLS:
        url = TMDB_EXPLORE_URLS[sort_method]
    else:
        url = TMDB_EXPLORE_URLS[EXPLORE_DEFAULT]
    params = {
        'api_key': TMDB_API_KEY,
    }
    response = requests.get(url, params=params)

    if response.status_code != 200:
        raise APIException(response.status_code,
                           response.json()['status_message'])

    return [_format_tmdb_movie(result) for result in response.json()['results']]
