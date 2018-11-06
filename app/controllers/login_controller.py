from app.models import User

from flask import request, redirect, url_for

from app.password_util import hash_password, validate_password
from app.session_util import is_user_logged_in, create_session, delete_session

class LoginController():
    def handle(self):
        req_data = request.form
        email = req_data['email']
        password = req_data['password']

        user = User.query.filter(User.email == email).one_or_none()

        if not user:
            delete_session()
            return "No user found!"

        password_hash = user.password_hash
        is_password_valid = validate_password(password, password_hash)
        if (is_password_valid):
            create_session(email)
            return redirect(url_for('home'))
        else:
            delete_session()
            return "Hacker detected! FBI enroute."