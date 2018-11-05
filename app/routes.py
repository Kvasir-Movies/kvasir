from app import app
from app.controllers import HomeController, OMDBSearchController

@app.route('/')
def hello():
    return 'Hello world!'

@app.route('/search-movies')
def search_omdb_movies():
    return OMDBSearchController().handle()

@app.route('/')
def home():
    return HomeController().handle()

