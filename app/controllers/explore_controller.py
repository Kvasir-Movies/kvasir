from app.util.tmdb_helpers import explore
from flask import jsonify, request

DESIRED_KEYS = [
    'title',
    'overview',
]

def handle_movie_data(movie):
    movie_data = { desired_key: movie.get(desired_key) for desired_key in DESIRED_KEYS }
    movie_data['externalMovieId'] = movie.get('id')
    # NOTE: Poster paths can be found by calling the /configuration API endpoint.
    #   Current API response found at https://developers.themoviedb.org/3/configuration/get-api-configuration
    movie_data['poster_path'] = 'https://image.tmdb.org/t/p/w500/{}'.format(movie.get('poster_path'))
    return movie_data

class ExploreController():
    def handle(self):
        sort_method = request.args.get('sort')
        response = explore(sort_method)
        return jsonify({'movies': [handle_movie_data(movie_data) for movie_data in response]})
