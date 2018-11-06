import json

from flask import request

from app.omdb_helpers import search_movies

class OMDBSearchController():
    def handle(self):
        searchword = request.args.get('search', '')
        return json.dumps({
            'searchResults': search_movies(searchword),
        })