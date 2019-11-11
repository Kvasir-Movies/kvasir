from flask import jsonify, request
from app.models import User
from app.util.password_util import validate_password
from app.util.session_util import create_session, delete_session


class LoginController:
    def handle(self):
        data = request.json
        email = data["email"]
        password = data["password"]

        user = User.query.filter(User.email == email).one_or_none()

        if not user:
            delete_session()
            return "", 401

        password_hash = user.password_hash
        is_password_valid = validate_password(password, password_hash)

        if is_password_valid:
            create_session(email)
            return jsonify(user.to_dict(include_lists=True))
        else:
            delete_session()
            return "", 401
