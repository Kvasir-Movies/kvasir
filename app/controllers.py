import json

from app.models import User
from flask import request
from .omdb_helpers import search_movies

from app.password_util import hash_password, validate_password

from flask import request

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
class LoginController():
    def handle(self):
        req_data = request.form
        email = req_data['email']
        password = req_data['password']

        user = User.query.filter(User.email == email).one_or_none()

        if not user:
            return "No user found!"

        password_hash = user.password_hash
        is_password_valid = validate_password(password, password_hash)
        if (is_password_valid):
            return "Login success!"
        else:
            return "Hacker detected! FBI enroute."

class LoginPageController():
    def handle(self):
          return '''<form method="POST">
                  Email: <input type="text" name="email"><br>
                  Password: <input type="password" name="password"><br>
                  <input type="submit" value="Submit"><br>
              </form>'''
