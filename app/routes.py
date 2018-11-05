import json

from app import app
from flask import request
from .omdb_helpers import search_movies

@app.route('/')
def hello():
    return 'Hello world!'

@app.route('/search-movies')
def search_omdb_movies():
    searchword = request.args.get('search', '')
    return json.dumps({
        'searchResults': search_movies(searchword),
    })
