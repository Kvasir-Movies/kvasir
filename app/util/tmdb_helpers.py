from app import app
import requests

TMDB_API_KEY = app.config.get('TMDB_API_KEY')
TMDB_SEARCH_MOVIE_URL = 'https://api.themoviedb.org/3/search/movie'


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
