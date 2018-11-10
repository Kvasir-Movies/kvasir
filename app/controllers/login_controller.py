import json

from flask import jsonify, request, redirect, session, url_for

from app.models import User
from app.password_util import hash_password, validate_password
from app.session_util import is_user_logged_in, create_session, delete_session

class LoginController():
    def handle(self):
        data = request.json
        email = data['email']
        password = data['password']

        user = User.query.filter(User.email == email).one_or_none()

        if not user:
            delete_session()
            return '', 401

        password_hash = user.password_hash
        is_password_valid = validate_password(password, password_hash)

        if is_password_valid:
            create_session(email)
            return jsonify(email=session['email'])
        else:
            delete_session()
            return '', 401
