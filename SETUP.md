# Backend

## Initial Setup

#### Install python

https://www.python.org/downloads/

#### Install virtualenv

https://docs.python-guide.org/dev/virtualenvs/
https://stackoverflow.com/questions/31133050/virtualenv-command-not-found

#### Make virtual env and activate it

- Create: `virtualenv -p python3 kvasir-env`
- Activate: `source ~/kvasir/kvasir-env/bin/activate`

#### Install dependencies

`pip install -r requirements.txt`

#### DB setup

Install postgres locally (https://postgresapp.com/ is an easy way)

Create db

- (in bash) > `psql`
- (in psql) > `create database kvasir_dev;`
- (in psql) > `create database kvasir_test;`

#### TMDB API Key

Vist https://www.themoviedb.org/, make an account, and generate an API key. Add a `.env` file to the root, with contents of

```
TMDB_API_KEY=YOUR_KEY
```

#### OMDB API Key

_Note_: This is possibly deprecated now, b/c OMDB doesn't support prefix search.
Vist http://www.omdbapi.com/apikey.aspx to generate an OMDB API key. Add a `.env` file to the root, with contents of

```
OMDB_API_KEY=YOUR_KEY
```

## Running the App

#### Migrations

To get your database migrated, run `flask db upgrade`. To downgrade when testing migrations, run `flask db downgrade`.

#### Test Setup

Our integration tests use Firefox. In order to run tests, you'll need the geckodriver. Download [here](https://github.com/mozilla/geckodriver/releases).
Once you've downloaded it, unzip the file and move it to `/usr/local/bin`: `mv ~/Downloads/geckodriver /usr/local/bin`.

To run the integration tests, run `python integration-tests/sessions_test.py`.

#### Start the server

`flask run`

# FRONTEND

## Install node

https://nodejs.org/en/download/

## Install yarn

https://yarnpkg.com/lang/en/docs/install

## Start webpack

`yarn && yarn start` - this should open `http://localhost:3000/` in your browser

# Editors

##PyCharm

- mark `kvasir-env/` as excluded
- mark `node_modules` as excluded
- activate tslint checker

# Heroku

- Install the heroku CLI
- Add heroku as a remote (`git remote add heroku https://git.heroku.com/reelpolitik.git`)
- To deploy, `git push heroku <branch-name>` (e.g. `git push heroku master`)
- Then `heroku run <command>` (e.g. `heroku run flask db upgrade`)
