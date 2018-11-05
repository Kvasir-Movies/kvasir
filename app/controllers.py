import json

from app.models import User
from flask import request
from .omdb_helpers import search_movies

class HomeController():
    def handle(self):
        user = User.query.first()
        if user:
            return f"Hello, {user.email}!"
        else:
            return "No users. Sad!"

class OMDBSearchController():
    def handle(self):
        searchword = request.args.get('search', '')
        return json.dumps({
            'searchResults': search_movies(searchword),
        })
