from app.util.tmdb_helpers import explore
from flask import jsonify

DESIRED_KEYS = [
    'title',
    'overview',
]

def handle_movie_data(movie):
    movie_data = { desired_key: movie.get(desired_key) for desired_key in DESIRED_KEYS }
    movie_data['externalMovieId'] = movie.get('id')
    movie_data['poster_path'] = 'https://image.tmdb.org/t/p/w370_and_h556_bestv2/{}'.format(movie.get('poster_path'))
    return movie_data

class ExploreController():
    def handle(self):
        response = explore()
        return jsonify({'movies': [handle_movie_data(movie_data) for movie_data in response]})
