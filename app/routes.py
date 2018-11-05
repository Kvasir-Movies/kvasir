from app import app
from app.controllers import HomeController, OMDBSearchController

@app.route('/')
def home():
    return HomeController().handle()

@app.route('/search-movies')
def search_omdb_movies():
    return OMDBSearchController().handle()

