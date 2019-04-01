from flask import jsonify, request
from app.util.tmdb_helpers import search_movies

img_url_template = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/{}'

class SlackController():
    def handle(self):
        movie_name = request.form['text']
        movies = search_movies(movie_name)[:5]
        parsed_movies = list(map(
            lambda movie: {
                'title': movie['title'],
                'thumb_url': img_url_template.format(movie['poster_path']),
            }, movies))
        return jsonify({
            'attachments': parsed_movies
        })
