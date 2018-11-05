import json

from app import app
from app.controllers import HomeController

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

@app.route('/')
def home():
    return HomeController().handle()

