import omdb

from app import app


omdb.set_default('apikey', app.config.get('OMDB_API_KEY'))


def search_movies(search_term):
    return omdb.search(search_term)
