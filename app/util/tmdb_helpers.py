from app import app
import requests

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
    'status',
    'release_date'
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


def _process_tmdb_data(tmdb_data):
    movie_data = { desired_key: tmdb_data.get(desired_key, None) for desired_key in DESIRED_KEYS }
    movie_data['externalMovieId'] = tmdb_data['id']
    poster_path = tmdb_data.get('poster_path', None)
    movie_data['poster_path'] = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/{}'.format(poster_path) if poster_path else None
    return movie_data


def search_movies(search_term):
    params = {
        'api_key': TMDB_API_KEY,
        'query': search_term
    }
    response = requests.get(TMDB_SEARCH_MOVIE_URL, params=params)
    if response.status_code != 200:
        raise APIException(response.status_code,
                           response.json()['status_message'])
    return [_process_tmdb_data(result) for result in response.json()['results']]


def get_movie(movie_id):
    params = {
        'api_key': TMDB_API_KEY,
    }
    response = requests.get(TMDB_FIND_MOVIE_URL + str(movie_id), params=params)

    if response.status_code != 200:
        raise APIException(response.status_code,
                           response.json()['status_message'])

    return _process_tmdb_data(response.json())

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

    return response.json().get('results')
