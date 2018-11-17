import omdb
import os

omdb.set_default('apikey', os.environ['OMDB_API_KEY'])

def search_movies(search_term):
    print(f'"{search_term}"')
    print(omdb.search(search_term))
    return omdb.search(search_term)
