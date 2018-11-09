import json

from app import db
from app.models import User

from flask import jsonify, request

from app.session_util import create_session


class SignupController():
    def handle(self):
        data = json.loads(request.data)
        email = data['email']
        password = data['password']

        user = User(email, password)
        db.session.add(user)
        db.session.commit()

        create_session(email)
        return jsonify(email=email, is_session_active=True)
