from app import db
from app.models import User

from flask import jsonify, request

from app.util.session_util import create_session


class SignupController():
    def handle(self):
        data = request.json
        email = data['email']
        password = data['password']

        user = User(email, password)
        db.session.add(user)
        db.session.commit()

        create_session(email)
        return jsonify(user=user.serialize(), is_session_active=True)
