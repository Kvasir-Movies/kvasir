# Install python somehow

# Install virtualenv

https://docs.python-guide.org/dev/virtualenvs/
https://stackoverflow.com/questions/31133050/virtualenv-command-not-found

# Make virtual env and activate it

virtualenv -p python3 kvasir-env
source ~/kvasir/kvasir-env/bin/activate

# Install dependencies

pip install -r requirements.txt

# Dev db setup

Install postgres locally (https://postgresapp.com/ is an easy way)

Create db
(in bash) > psql
(in psql) > create database kvasir_dev;

# Upgrade db

> flask db upgrade

# TMDB API Key

Vist https://www.themoviedb.org/, make an account, and generate an API key. Add a `.env` file to the root, with contents of

```
TMDB_API_KEY=YOUR_KEY
```

# OMDB API Key

_Note_: This is possibly deprecated now, b/c OMDB doesn't support prefix search.
Vist http://www.omdbapi.com/apikey.aspx to generate an OMDB API key. Add a `.env` file to the root, with contents of

```
OMDB_API_KEY=YOUR_KEY
```

########FRONTEND########

# Install node

# Install yarn

# Editors

##PyCharm

- mark `kvasir-env/` as excluded
- mark `node_modules` as excluded
- activate tslint checker
