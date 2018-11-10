from flask import jsonify, request

from app.omdb_helpers import search_movies

class MovieSearchController():
    def handle(self):
        searchword = request.args.get('search', '')
        return jsonify({
            'searchResults': search_movies(searchword),
        })
