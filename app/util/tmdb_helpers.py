from app import app
import requests

TMDB_API_KEY = app.config.get('TMDB_API_KEY')
TMDB_SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie'
TMDB_FIND_MOVIE_URL = 'https://api.themoviedb.org/3/movie/'
TMDB_EXPLORE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc'

DESIRED_KEYS = [
    'title',
    'overview',
    'genres',
    'status',
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


def search_movies(search_term):
    params = {
        'api_key': TMDB_API_KEY,
        'query': search_term
    }
    response = requests.get(TMDB_SEARCH_MOVIE_URL, params=params)
    if response.status_code != 200:
        raise APIException(response.status_code,
                           response.json()['status_message'])

    return response.json()['results']


def get_movie(movie_id):
    params = {
        'api_key': TMDB_API_KEY,
    }
    response = requests.get(TMDB_FIND_MOVIE_URL + str(movie_id), params=params)

    if response.status_code != 200:
        raise APIException(response.status_code,
                           response.json()['status_message'])

    movie_data = { desired_key: response.json()[desired_key] for desired_key in DESIRED_KEYS }
    movie_data['externalMovieId'] = movie_id
    movie_data['poster_path'] = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/{}'.format(response.json()['poster_path'])
    return movie_data


def explore():
    params = {
        'api_key': TMDB_API_KEY,
    }
    response = requests.get(TMDB_EXPLORE_URL, params=params)

    if response.status_code != 200:
        raise APIException(response.status_code,
                           response.json()['status_message'])

    return response.json().get('results')
