import json

from flask import request

from app.util.tmdb_helpers import search_movies


class MovieSearchController:
    def handle(self):
        searchword = request.args.get("search", "")
        return json.dumps({"searchResults": search_movies(searchword),})
